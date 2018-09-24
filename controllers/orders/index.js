const db = require('../../config/db')
const Order = db.order
const Insurance = db.insurance

function createOrder (req, res) {
  Order.create({
    insuranceId: req.body.insuranceId,
    username: req.body.username
  })
    .then(
      () => {
        Insurance.findById(req.body.insuranceId)
          .then(
            insurance => {
              if (insurance) {
                insurance.passenger = insurance.passenger - 1
                insurance.save()
                  .then(
                    () => {
                      return res.send({
                        error: false,
                        message: 'Transaction has been created successully'
                      })
                    }
                  )
              }
            }
          )
          .catch(
            err => {
              return res.send({
                error: true,
                message: err
              })
            }
          )
      }
    )
    .catch(
      err => {
        res.send({
          error: true,
          message: err
        })
      }
    )
}

module.exports = {
  createOrder
}
