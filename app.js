const express = require('express')
const app = express()
const db = require('./sequelize')
const Insurance = db.insurance
const InsuranceDetail = db.insurance_detail

const port = 3000

app.get('/insurances', (req, res) => {
  Insurance.findAll({
    where: {
      // airlinesName: {
      //   $like: `%${req.query.airlinesName}%`
      // },
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
        });
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
})

app.get('/insurances/:id', (req, res) => {
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
})

// TODO create order function

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
