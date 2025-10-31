const sequelize = require("./dbconfig");
const users=require("./models/Users"); 
(async () => {
    try {
        await sequelize.authenticate();
        console.log("success.");
        await sequelize.sync(); 
        console.log("  models were synchronized successfully.");
    } catch (error) {
        console.error(" Unable to connect to the database:", error);
    } finally {
        await sequelize.close();
    }
})();


const express=require("express")
const app=express()
const queries=require("./query/userqueries")

app.listen(3000, () =>{
        console.log('Listening on 3000');
});

app.get('/user',(req,res)=>{
    res.json(queries.findAll())
})
app.post('/createuser',async(req,res)=>{
    try{
        const 
    }
})