const mongoose=require("mongoose");
const dotenv=require("dotenv");
const PlantsData = require("./Data/PlantsData");
const Experience=require("./Data/Expdata")
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
    PlantImage : String,
    Rating:Number
})

const UserSchema=mongoose.Schema({
    UserName : {type : String},
    Gmail : {type : String, required : true, unique : true, match: [/.+\@.+\..+/, "Please fill a valid email address"]},
    Password : {type : String, required : true, minlength: [5, "Password should be at least 2 characters long"] }
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