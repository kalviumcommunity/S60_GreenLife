const mongoose=require("mongoose");
const dotenv=require("dotenv");
const PlantsData = require("./PlantsData");
const Experience=require("./Expdata")
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

const ExpSchema=mongoose.Schema({
    experience : String,
    image : String
})
const PlantModel=mongoose.model("plants",plantSchema)
const UserModel=mongoose.model("Users",UserSchema)
const ExpModel=mongoose.model("Experience",ExpSchema)

// ExpModel.insertMany(Experience)
// .then(()=>console.log("exp data is sended to database"))
// .catch((err)=>console.log("database error:",err))

module.exports={Connection: ConnectDatabase, SchemaModel : PlantModel, UsersModel:UserModel, ExpModel:ExpModel};