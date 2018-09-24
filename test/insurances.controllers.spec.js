process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../index')
const db = require('../config/db')
const Insurance = db.insurance
const InsuranceDetail = db.insurance_detail
const truncate = require('./truncate')

chai.use(chaiHttp)

describe('Insurance', () => {
  describe('GET /insurances', () => {
    it('it should error if do not complete params', (done) => {
      chai.request(server)
        .get('/insurances')
        .end((err, res) => {
          should.not.exist(err)
          res.body.should.be.a('object')
          res.status.should.equal(200)
          res.body.error.should.equal(true)
          res.body.should.have.property(
            'messages'
            ).eql('Please completed params query (airline name, flight number, date of flight)')
          done()
      })
    })

    it('it returns data insurances if complete params', (done) => {
      chai.request(server)
        .get('/insurances')
        .query({
          airlinesName: 'airline name',
          flightNumber: 'flight number',
          dateFlight: '2018-12-12 12:12:00'
        })
        .end((err, res) => {
          should.not.exist(err)
          res.body.should.be.a('object')
          res.status.should.equal(200)
          res.body.error.should.equal(false)
          res.body.should.to.have.property('insurance')
          done()
        })
    })
  })

  describe('GET /insurances/:id', () => {
    before(async () => {
      await truncate(Insurance)
    })

    it('it returns data insurance detail', (done) => {
      const insurance = new Insurance({
        airlinesName: 'Airline Name',
        flightNumber: 'Flight Number',
        dateFlight: '2018-12-12 09:00:00',
        passenger: 0,
        price: 300000
      })

      insurance.save().then(
        (insurance) => {
          const insuranceDetail = new InsuranceDetail({
            insuranceId: insurance.id,
            description: 'Description',
            termCondition: 'Term Condition'
          })

          insuranceDetail.save().then(
            (insuranceDetail) => {
              chai.request(server)
                .get('/insurances/' + insuranceDetail.insuranceId)
                .end((err, res) => {
                  should.not.exist(err)
                  res.body.should.be.a('object')
                  res.status.should.equal(200)
                  res.body.error.should.equal(false)
                  res.body.should.to.have.property('insuranceDetail')
                  done()
                })
            }
          )
        }
      )
    })
  })
})
