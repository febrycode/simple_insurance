const insuranceService = require('../controllers/insurances')

function init (server) {
  server.get('*', function (req, res, next) {
    console.log('Request was made to: ' + req.originalUrl)
    return next()
  })

  server.get('/insurances', insuranceService.getAll)
  server.get('/insurances/:id', insuranceService.getById)
}

module.exports = {
  init
}
