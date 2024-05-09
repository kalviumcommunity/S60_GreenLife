const mongoose=require("mongoose");
const dotenv=require("dotenv");
const PlantsData = require("./PlantsData")
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
    ScientificName:String,
    PlantType:String,
    FamilyName:String,
    PlantCost:String,
    ReferenceLink:String,
    Uses : String,
    Toxicity : String,
    Cautions : String,
    WateringTips : String,
    NeedOfSunlight : String,
    PlantImage : String
})
const PlantModel=mongoose.model("plants",plantSchema)

PlantModel.insertMany(PlantsData)
.then(()=>console.log("plants data is sended to database"))
.catch((err)=>console.log("database error:",err))

module.exports={Connection: ConnectDatabase, SchemaModel : PlantModel};