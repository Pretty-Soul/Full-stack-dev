const config=require("./config")
const connectDatabase=async()=>{
    try{
        await config.authenticate();
        console.log("Connection successfull")
    }
    catch(error){
        console.error("Error occured Connecting to the database",error);
    }
}
connectDatabase();