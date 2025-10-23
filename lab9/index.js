const express=require("express")
const sequelize = require("./dbconfig");
const student=require("./models/student"); 
const subject=require("./models/subject"); 
const app=express()
const queries=require("./query/userqueries")
const { getStudentsWithSubjects } = require("./query/userqueries");

(async () => {
    try {
        await sequelize.authenticate();
        console.log("success.");
        await sequelize.sync(); 
        console.log("  models were synchronized successfully.");
        app.listen(3000, () => {
            console.log("Server is listening on port 3000");
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();


app.get("/studentdata", async (req, res) => {
  try {
    const data = await queries.findAll_student();
    res.json(data);
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).json({ error: "Error fetching student data" });
  }
});


app.get("/subjectdata", async (req, res) => {
  try {
    const data = await queries.findAll_subject();
    res.json(data);
  } catch (error) {
    console.error("Error fetching subject data:", error);
    res.status(500).json({ error: "Error fetching subject data" });
  }
});


app.get("/students-subjects", async (req, res) => {
  try {
    const data = await queries.getStudentsWithSubjects();
    res.json(data);
  } catch (err) {
    console.error("Error in /students-subjects:", err); 
    res.status(500).send("Internal server error");
  }
});

// Example placeholder for POST route (not yet implemented)
/*
app.post('/createuser', async (req, res) => {
  try {
    const user = await queries.create_student(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create student" });
  }
});
*/
