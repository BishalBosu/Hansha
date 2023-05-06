const Sequelize = require("sequelize")
const sequelize = require("../utils/database")


const Message  = sequelize.define('message', {

    id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
        autoIncrement: true,
		allowNull: false,
	},
    message: {
		type: Sequelize.STRING,
		allowNull: false,
	}, 

});

module.exports = Message