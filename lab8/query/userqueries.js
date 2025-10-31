const user = require("../models/Users");
const findAll=async()=>{
    return await user.findAll();
}
const create=async(userdata)=>{
    return await user.create(userdata)
}
module.exports = { findAll, create };