const Sequelize = require('sequelize');

const sequelize = new Sequelize('insurance', 'root', 'apecsaosdibalik', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.insurance = require('./models/Insurance')(sequelize, Sequelize);
db.insurance_detail = require('./models/InsuranceDetail')(sequelize, Sequelize);
db.order = require('./models/Order')(sequelize, Sequelize);

db.insurance.hasMany(
  db.insurance_detail,
  {
    foreignKey: 'insurance_id',
    sourceKey: 'id'
  }
);

db.insurance_detail.belongsTo(
  db.insurance,
  {
    foreignKey: 'insurance_id',
    targetKey: 'id'
  }
);

module.exports = db;