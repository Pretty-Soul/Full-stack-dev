const { Student, Subject, sequelize } = require("../models");

const findAll_student = async () => {
  return await Student.findAll();
};

const findAll_subject = async () => {
  return await Subject.findAll();
};

const create_student = async (userdata_stu) => {
  return await Student.create(userdata_stu);
};

const create_subject = async (userdata_sub) => {
  return await Subject.create(userdata_sub);
};

const getStudentsWithSubjects = async () => {
  return await Student.findAll({
    include: {
      model: Subject,
      through: { attributes: [] }
    }
  });
};

module.exports = {
  findAll_student,
  findAll_subject,
  create_student,
  create_subject,
  getStudentsWithSubjects
};
