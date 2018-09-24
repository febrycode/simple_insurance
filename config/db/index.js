const Sequelize = require('sequelize')
const config = require('../global')

const sequelize = new Sequelize(config.dbDatabase, config.dbUser, config.dbPassword, {
  host: config.dbHost,
  dialect: config.dbDialect,
  pool: config.dbPool
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.insurance = require('./models/Insurance')(sequelize, Sequelize)
db.insurance_detail = require('./models/InsuranceDetail')(sequelize, Sequelize)
db.order = require('./models/Order')(sequelize, Sequelize)

db.insurance.hasMany(
  db.insurance_detail,
  {
    foreignKey: 'insurance_id',
    sourceKey: 'id'
  }
)

db.insurance_detail.belongsTo(
  db.insurance,
  {
    foreignKey: 'insurance_id',
    targetKey: 'id'
  }
)

module.exports = db
