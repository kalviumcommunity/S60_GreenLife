const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config()

function ConnectDatabase(){

mongoose.connect(process.env.Connection_String)
.then(()=>{
    console.log("Your database is connected with Project")
})
.catch((err)=>{
    console.log("database error:",err)
})
}
module.exports={Connection: ConnectDatabase}