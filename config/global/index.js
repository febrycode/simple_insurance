module.exports = {
  dev: {
    dbDatabase: 'insurance',
    dbUser: 'root',
    dbPassword: 'apecsaosdibalik',
    dbHost: 'localhost',
    dbDialect: 'mysql',
    dbPool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    dbDatabase: 'insurance_test',
    dbUser: 'root',
    dbPassword: 'apecsaosdibalik',
    dbHost: 'localhost',
    dbDialect: 'mysql',
    dbPool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
}
