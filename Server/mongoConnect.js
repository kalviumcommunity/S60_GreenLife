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
    PlantFilter:[String],
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

const UserSchema=mongoose.Schema({
    UserName : String,
    Gmail : String,
    Password : String
})
const PlantModel=mongoose.model("plants",plantSchema)
const UserModel=mongoose.model("Users",UserSchema)

// PlantModel.insertMany(PlantsData)
// .then(()=>console.log("plants data is sended to database"))
// .catch((err)=>console.log("database error:",err))

module.exports={Connection: ConnectDatabase, SchemaModel : PlantModel, UsersModel:UserModel};