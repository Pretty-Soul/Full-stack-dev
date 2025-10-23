const express = require('express');
const port=3000;
const app = express();

app.get('/',(req, res) => {
   //res.sendFile(path.join(__dirname,'static/index.html')) //displays the html file
   res.send('hello !');
});

app.get('/student',(req, res) => {
    res.json({
        "name":"kutbuddin",
        "role":"student"
    })
})


//callback function
function greet(name, callback) {
    console.log("Hello, " + name);
    callback();
}

function sayBye() {
    console.log("Goodbye!");
}

greet("kutbuddin", sayBye);




//set timout(asnychronous coding)

console.log("Step1")

setTimeout(()=>{
    console.log("step 2")
},5000);

console.log("Step 3")

setTimeout(() => console.log("Timout 2"), 4999);


//Error handling (try and catch)

try{
    json.parse("{in")
}
catch(error){
    console.log("Error occured"+error)
}


//Erro handling in file system(fs module)

const fs=require("fs")//errror

//fs.writeFile("demo.txt","hello")  //if you write this cpde then no error

fs.readFile("demo.txt","utf-8",(err,data)=>{
    if(err){
        console.log("Error Ocurred"+err)
        return
    }
    console.log(data);
});


//error handling in promiss     error
/*
fs.readFile("demo.txt","utf-8").then(data=>{
    console.log(data)
})
.catch(err=>console.log(err));



app.listen(port, () =>{
        console.log('Listening on 3000');
});
*/


//events emmiter 

const eventEmmiter=require("events");
const event=new eventEmmiter();
event.on("greet",()=>{
    console.log("Hello, Event triggered")
})
event.emit("greet");



const sumcal=(a,b, callback)=> {
    console.log(a+b);
    callback();
}

function printmessage() {
    console.log("The sum of num1 and num2 is: ");
}

sumcal(5,6, printmessage);

/*
function displaySum(sum1) {
  console.log("The sum of num1 and num2 is: "+sum1);
}

function calculateSum(num1, num2) {
  let sum = num1 + num2;
  displaySum(sum);
}
calculateSum(5, 5);





*/