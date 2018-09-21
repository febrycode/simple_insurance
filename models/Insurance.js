module.exports = (sequelize, Sequelize) => {
	const Insurance = sequelize.define('insurances', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		airlinesName: {
      type: Sequelize.STRING,
      field: 'airlines_name'
		},
		flightNumber: {
      type: Sequelize.STRING,
      field: 'flight_number'
		},
		dateFlight: {
      type: Sequelize.STRING,
      field: 'date_flight'
		},
		passenger: {
      type: Sequelize.STRING,
      field: 'passenger'
		},
		price: {
			type: Sequelize.DECIMAL(15,4),
			field: 'price'
		},
		createdAt: {
			type: Sequelize.DATE,
			field: 'created_at'
		},
		updatedAt: {
			type: Sequelize.DATE,
			field: 'updated_at'
		}
	});
	
	return Insurance;
}