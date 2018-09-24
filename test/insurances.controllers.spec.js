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
  beforeEach(async () => {
    await truncate([InsuranceDetail, Insurance])
  })

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
})
