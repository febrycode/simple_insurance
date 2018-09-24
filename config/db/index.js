const Sequelize = require('sequelize')
const config = require('../global')

const configDb = (process.env.NODE_ENV === 'test') ? config.test : config.dev

const sequelize = new Sequelize(configDb.dbDatabase, configDb.dbUser, configDb.dbPassword, {
  host: configDb.dbHost,
  dialect: configDb.dbDialect,
  pool: configDb.dbPool,
  logging: false
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.insurance = require('../../models/Insurance')(sequelize, Sequelize)
db.insurance_detail = require('../../models/InsuranceDetail')(sequelize, Sequelize)
db.order = require('../../models/Order')(sequelize, Sequelize)

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
