var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	var Pictures = sequelize.define('Pictures', {
		id: {
			type: Sequelize.DataTypes.UUID,
			primaryKey: true,
			autoIncrement: true
		},
		caption: {
			type: Sequelize.STRING(1000)
		},
		link: {
			type: Sequelize.STRING(500)
		},
		userID: {
			type: Sequelize.BIGINT.UNSIGNED,
		}
	}, {
		timestamps: false,
			freezeTableName: true, // Model tableName will be the same as the model name
			tableName: 'Pictures'
		});

	return Pictures;
}