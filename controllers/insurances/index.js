const db = require('../../config/db')
const Insurance = db.insurance
const InsuranceDetail = db.insurance_detail

function getAll (req, res) {
  if (typeof req.query.airlinesName === 'undefined' ||
  typeof req.query.flightNumber === 'undefined' ||
  typeof req.query.dateFlight === 'undefined') {
    return res.send({
      error: true,
      messages: 'Please completed params query (airline name, flight number, date of flight)'
    })
  }
  Insurance.findOne({
    where: {
      airlinesName: {
        $like: `%${req.query.airlinesName}%`
      },
      flightNumber: {
        $like: `%${req.query.flightNumber}%`
      },
      dateFlight: {
        $like: `%${req.query.dateFlight}%`
      }
    },
    attributes: ['airlinesName', 'flightNumber', 'dateFlight', 'passenger', 'price']
  })
    .then(
      insurance => {
        res.status(200).send({
          error: false,
          insurance: insurance
        })
      }
    )
    .catch(
      err => {
        res.status(200).send({
          error: true,
          messages: err
        })
      }
    )
}

function getById (req, res) {
  const insuranceId = req.params.id

  InsuranceDetail.findAll({
    attributes: ['description', 'termCondition'],
    where: {
      insuranceId: insuranceId
    },
    include: [
      {
        model: Insurance,
        attributes: ['airlinesName', 'flightNumber', 'dateFlight', 'passenger', 'price'],
      }
    ]
  })
    .then(
      insuranceDetails => {
        res.status(200).send({
          error: false,
          insuranceDetails: insuranceDetails
        })
      }
    )
    .catch(
      err => {
        res.status(200).send({
          error: true,
          messages: err
        })
      }
    )
}

module.exports = {
  getAll,
  getById
}
