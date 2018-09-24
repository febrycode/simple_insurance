const db = require('../../config/db')
const Order = db.order

function createOrder (req, res) {
  Order.create({
    insuranceId: req.body.insuranceId,
    username: req.body.username
  })
    .then(
      () => {
        res.send({
          error: false,
          message: 'Transaction has been created successully'
        })
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
