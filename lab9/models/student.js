const dbconfig = require("../dbconfig");
const { DataTypes } = require("sequelize");

const Student = dbconfig.define("student", {
  rollno: {
    type: DataTypes.INTEGER.UNSIGNED,
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

module.exports = Student;





/*
const dbconfig = require("../dbconfig");
const { DataTypes } = require("sequelize"); 
const Student = dbconfig.define("student", {
    rollno: {
        type: DataTypes.INTEGER.UNSIGNED,
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

module.exports = Student; 
*/

/*

// Define association
Student.belongsToMany(Subject, {
  through: StudentSubject,
  foreignKey: "studentRollno",
  otherKey: "subjectCode"
});

*/