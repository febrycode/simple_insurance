const express = require('express');
const app = express();
db = require('./sequelize');
Insurance = db.insurance;
InsuranceDetail = db.insurance_detail;

const port = 3000

app.get('/insurances', (req, res) => {
  Insurance.findAll({
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
      });
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
      });
    }
  )
  .catch(
    err => {
      res.status(200).send({
          error: true,
          messages: err
      });
    }
  )
})

app.post('/order', (req, res) => {
  Order.create({
    username: username,
    insuranceId: insuranceId,
  })
  .then(
    () => {
      return res.status(201).send({
          error: false,
          messages: "Data has been success"
      });
    }
  )
.catch(
    () => {
      return res.status(200).send({
        error: true,
        messages: "Data has been failed"
      });
    }
)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))