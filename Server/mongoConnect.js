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

const plantSchema=mongoose.Schema({
    PlantName:String,
    PlantType:String,
    PlantCost:String
})
const PlantModel=mongoose.model("plants",plantSchema)
module.exports={Connection: ConnectDatabase, SchemaModel : PlantModel};