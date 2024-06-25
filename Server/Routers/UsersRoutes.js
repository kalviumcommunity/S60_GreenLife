const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
const {check,validationResult}=require("express-validator");
const {UsersModel}=require("../mongoConnect")

const UserRoutes=express.Router()
dotenv.config()


const validationRules= [
    check("UserName", "username is required").not().isEmpty(),
    check("Gmail", "Email is not valid").isEmail(),
    check("Password", "Enter password of 5 or more characters").isLength({ min: 5 })
]
const loginvalidationRules=[
    check('Gmail', 'Enter valid email').isEmail(),
    check('Password', 'Password is required').exists()
  ]

UserRoutes.post("/postuser",validationRules,async (request,response)=>{

    const validationError=validationResult(request);
    if(!validationError.isEmpty()){
        return response.status(400).json({validationError : validationError.array()})
    }
   
    const{UserName,Gmail,Password}=request.body;
      try{
        let users=await UsersModel.findOne({ Gmail })
        if(users){
            return response.status(400).json({ note : "User already exists"})
        }
        NewUser=new UsersModel({
            UserName,Gmail,Password
        })
        const hashsalt=await bcrypt.genSalt(5)
        NewUser.Password=await bcrypt.hash(Password,hashsalt)
        await NewUser.save();
        const createPayload={
            NewUser : {
                id : NewUser.id
            }
        }
        jwt.sign(createPayload,process.env.Secret_key,{expiresIn : "3600d"},(error,jwtToken)=>{
            if(error){
                throw err
            }else{
                response.json({jwtToken})
            }
        })
    }catch(error){
        response.status(500).send("Server error in UserRoutes.js (postuser route)")
    }
})

UserRoutes.post("/login",loginvalidationRules, async(request,response)=>{

    const validationError=validationResult(request);
    if(!validationError.isEmpty()){
        return response.status(400).json({validationError : validationError.array()})
    }

   
    const{Gmail,Password}=request.body;
    try{
        let validuser=await UsersModel.findOne({ Gmail });
        if(!validuser){
            return response.status(400).json({note : "User details not found in database"})
        }
        const correctPassword=await bcrypt.compare(Password,validuser.Password);
        if(!correctPassword){
            return response.status(400).json({note : "Incorrect Password"})
        }
        const createPayload={
            NewUser : {
                id : validuser.id
            }
        };
        jwt.sign(createPayload,process.env.Secret_key,{expiresIn : "3600d"},(error,jwtToken)=>{
            if(error){
                throw error
            }else{
                response.json({jwtToken})
            }
        })
    }catch(error){
        response.status(500).json("Server error in UserRoutes.js (login route error)")
    }
})

UserRoutes.get("/:id",async(request,response)=>{
    try{
        const getuser=await UsersModel.findById(request.params.id).select("-Password");
        if(!getuser){
            return response.status(404).json({note : "User not found in database"})
        }
        response.json({username : getuser.UserName})
    }catch(error){
        response.status(500).json({note : "speific user route error in server"})
    }
})

module.exports=UserRoutes