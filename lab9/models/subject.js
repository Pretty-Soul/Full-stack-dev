const dbconfig = require("../dbconfig");
const { DataTypes } = require("sequelize");

const Subject = dbconfig.define("subject", {
  subject_code: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Subject;



/*

const dbconfig = require("../dbconfig");
const { DataTypes } = require("sequelize"); 
const Subject = dbconfig.define("subject", {
    subject_code: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Subject; 


*/


/*
Subject.belongsToMany(Student, {
  through: StudentSubject,
  foreignKey: "subjectCode",
  otherKey: "studentRollno"
});*/