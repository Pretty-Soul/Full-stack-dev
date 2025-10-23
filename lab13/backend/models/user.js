const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  class:{
    type: DataTypes.STRING,
    allowNull: false
  },
  rollno:{
    type:DataTypes.STRING,
    allowNull:false
  },
  marks:{
    type:DataTypes.STRING,
    enum: ['Full-Stack', 'Internet Technology','Cloud Computing','UI-UX'],
    required : true
  }
});

module.exports = User;
