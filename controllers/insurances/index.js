const Insurance = require('../../models/Insurance')
const InsuranceDetail = require('../../models/InsuranceDetail')

function getAll (req, res) {
  Insurance.findAll({
    where: {
      airlinesName: {
        $like: `%${req.query.airlinesName}%`
      }
      // TODO search data by properties
      // flightNumber: {
      //   $like: `%${req.query.flightNumber}%`
      // }
    },
    attributes: ['airlinesName', 'flightNumber', 'dateFlight', 'passenger', 'price'],
  })
    .then(
      insurances => {
        res.status(200).send({
          error: false,
          insurances: insurances
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

// TODO create order function

module.exports = {
  getAll,
  getById
}
