const delay=(timeinms)=>{
    return new Promise((resolve=>setTimeout(resolve,timeinms)))
}
delay(1000)
.then(()=>{
    console.log("Promise1")
    return delay(1000);
})
.then(()=>{
    console.log("Promise2")
    return delay(1000);
})
.then(()=>{
    console.log("Promise3")
})
.catch((error)=>{
    console.error(error)
})

const reminder=require("./reminder")
console.log(reminder.addTask)
console.log(reminder.taskreminder)