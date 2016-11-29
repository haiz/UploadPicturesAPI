var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	var Pictures = sequelize.define('Pictures', {
		id: {
			type: Sequelize.DataTypes.UUID,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV1
		},
		caption: {
			type: Sequelize.STRING(1000)
		},
		link: {
			type: Sequelize.STRING(1000)
		},
		userID: {
			type: Sequelize.BIGINT.UNSIGNED,
		}
	}, {
			charset: 'utf-8',
			collate: 'utf8_unicode_ci',
			timestamps: false,
			freezeTableName: true, // Model tableName will be the same as the model name
			tableName: 'Pictures'
		});

	return Pictures;
}