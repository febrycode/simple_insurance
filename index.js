const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()

app.use(bodyParser.json())

const port = 3000

routes.init(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app
