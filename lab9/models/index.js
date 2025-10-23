const sequelize = require("../dbconfig");
const Student = require("./student");
const Subject = require("./subject");
const StudentSubject = require("./studentsubject");


Student.belongsToMany(Subject, {
  through: StudentSubject,
  foreignKey: "studentRollno",
  otherKey: "subjectCode"
});

Subject.belongsToMany(Student, {
  through: StudentSubject,
  foreignKey: "subjectCode",
  otherKey: "studentRollno"
});

module.exports = {
  sequelize,
  Student,
  Subject,
  StudentSubject
};
