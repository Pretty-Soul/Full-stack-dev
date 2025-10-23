const dbconfig = require("../dbconfig");
const { DataTypes } = require("sequelize");

const StudentSubject = dbconfig.define("StudentSubjects", {}, {  });

module.exports = StudentSubject;
