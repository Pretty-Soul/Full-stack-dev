const dbconfig = require("../dbconfig");
const { DataTypes } = require("sequelize"); 
const User = dbconfig.define("user", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = User; 
