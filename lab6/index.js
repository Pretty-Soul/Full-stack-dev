const cron=require("node-cron");
let seconds=1
cron.schedule("* * * * * *",()=>{
    console.log("task running every seconds "+seconds++)
})
cron.schedule("*/3 * * * * *",()=>{
    console.log("task running after 3 seconds "+seconds++)
})
cron.schedule("*27 * * * *",()=>{
    console.log("task running at  27  minute ")
})


