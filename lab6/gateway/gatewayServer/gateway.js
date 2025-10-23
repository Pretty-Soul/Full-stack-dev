const express = require('express');
const {createProxymiddleware} =require('http-proxy-middleware');
const fs=require("fs");
const port=3000;
const app = express();

app.use(express.json())
const time=new Date();
const writestream=fs.createWriteStream(`log2_${time.toISOString()}.txt`,'utf-8')
app.use((req,res,next)=>{
        console.log(req.headers["authorization"]);
        console.log(res.headers)
        writestream.write(json.stringyfy(req,header)+"\n");
        next();
})
/*
app.get('/getstudent',createProxymiddleware({
        target:"http://localhost:4001",
        changedOrigin: true,
        pathrewrite:{'^/getstudent':'/getstudents'}
}));
app.get('/getteacher',createProxymiddleware({
        target:"http://localhost:4001",
        changedOrigin: true,
        pathrewrite:{'^/getteacher':'/getteachers'}
}));*/

app.listen(port, () =>{
        console.log('Listening on 3000');
});