const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    database: 'stu_sub',
    username : 'root',
    password: '',
    host: 'localhost',
    dialect : 'mysql',
});

module.exports = sequelize;
