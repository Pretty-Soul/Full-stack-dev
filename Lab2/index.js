const fs=require("fs")
const math=require("./math")
const lodash =require("lodash")

const express = require('express');
const path = require("path");
const port=3000;
const app = express();

fs.writeFileSync("data.csv","hello")
fs.appendFileSync("data.csv"," world")
const data=fs.readFileSync("data.csv","utf8")

//add user defined library
/*console.log(data)
console.log(math.addnumbers(5,5))
console.log(math.subnumbers(5,5))
console.log(math.mulnumbers(5,5))
console.log(math.divnumbers(5,5))
console.log(math.modnumbers(5,5))*/

//lodash dependency
let arr=[1,3,5,2,6,4,9,8,7]
console.log(lodash.add(5,10))
console.log(lodash.sortBy(arr))


app.get('/',(req, res) => {
   //res.sendFile(path.join(__dirname,'static/index.html')) //displays the html file
   console.log("req.query");
   res.send("hello world");
});

app.get('/student',(req, res) => {
    res.json({
        "name":"kutbuddin",
        "role":"student"
    })
})

app.use(express.static("static"))

app.listen(port, () =>{
        console.log('Listening on 3000');
});