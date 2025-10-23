const fs=require("fs")
const streamin=fs.createReadStream("log.txt","utf8")
const streamout=fs.createWriteStream("log_backup.txt","utf-8")
let fileread
streamin.pipe(streamout)
const stat=fs.statSync("log.txt")
streamin.on("data",(data)=>{
    console.log("progresing",data.length,stat.size);
    fileread+=data.length;
    console.log(fileread(stat.size) +"% progress transfered")//chk
});
streamin.on("end",(data)=>{
    console.log("data transfered ended");
});
streamin.on("error",()=>{
    console.log("error occured while reading");
});
streamout.on("error",()=>{
    console.log("error occured in data out");
});

