const express=require("express");
const {SchemaModel}=require("../mongoConnect");
// const Authentication=require("../Authentication/ProtectRoutes")

const PlantRouter=express.Router()
// console.log(Authentication,"first line")
PlantRouter.get("/get",(request,response)=>{
    // response.send("This is a get request")
    SchemaModel.find({})
    .then((plantlist)=>{response.json({plantlist})})
    .catch((err)=>{response.json({err})})
})

PlantRouter.get("/getplant/:id",async(request,response)=>{
    const plantid=request.params.id;
    // console.log(Authentication,"***")
    try{
        const plant=await SchemaModel.findById(plantid);
        if(!plant){
            return response.status(404).json({error: "Plant not found"})
        }
        response.json({plant})
    }catch(error){
        response.status(500).json({error : "get plant route error"})
    }
})

PlantRouter.put("/put/:id",(request,response)=>{
    response.send("This is a put request")
})

PlantRouter.post("/post",(request,response)=>{
    response.send("This  is a post request")
})

PlantRouter.delete("/delete/:id",(request,response)=>{
    response.send("This is a delete request")
})

module.exports=PlantRouter
