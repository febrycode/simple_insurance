module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('orders', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    insuranceId: {
      type: Sequelize.STRING,
      field: 'insurance_id'
    },
    username: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at'
    }
  })

  return Order
}
