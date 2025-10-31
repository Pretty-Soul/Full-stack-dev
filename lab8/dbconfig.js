const { Sequelize } = require("sequelize");

// Create Sequelize instance
const sequelize = new Sequelize({
    database: 'student2',
    username : 'root',
    password: '',
    host: 'localhost',
    dialect : 'mysql',
});

module.exports = sequelize;
