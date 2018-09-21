module.exports = (sequelize, Sequelize) => {
	const InsuranceDetail = sequelize.define('insurance_details', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		insuranceId: {
      type: Sequelize.STRING,
      field: 'insurance_id'
		},
		description: {
      type: Sequelize.STRING,
		},
		termCondition: {
      type: Sequelize.STRING,
      field: 'term_condition'
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
	
	return InsuranceDetail;
}