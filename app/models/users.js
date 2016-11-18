var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	var Users = sequelize.define('Users', {
		id: {
			type: Sequelize.DataTypes.UUID,
			primaryKey: true,
			autoIncrement: true
		},
		nickName: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		email: {
			type: Sequelize.STRING(200),
		},
		password:{
			type: Sequelize.STRING(500),
		},
		phone: {
			type: Sequelize.STRING(20)
		}
	}, {
		timestamps: false,
			freezeTableName: true, // Model tableName will be the same as the model name
			tableName: 'Users'
		});

	return Users;
}