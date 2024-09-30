const express=require("express");
const {SchemaModel}=require("../mongoConnect");
const Authentication=require("../Authentication/ProtectRoutes");
// const {PlantPurchaseSchema}=require("../mongoConnect");

const PlantRouter=express.Router()

PlantRouter.get("/get",(request,response)=>{
    SchemaModel.find({})
    .then((plantlist)=>{response.json({plantlist})})
    .catch((err)=>{response.json({err})})
})

PlantRouter.get("/getplant/:id",Authentication,async(request,response)=>{
    const plantid=request.params.id;

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

// PlantRouter.post("/buy",Authentication,async(request,response)=>{
// const {UserId,plantId,quantity}=request.body;

// if(!UserId||!plantId||!quantity){
//     return response.status(400).json({note : "all the data is not provided"})
// }
// try{
//     const newPlant= PlantPurchaseSchema({
//         UserId : UserId,
//         plantId : plantId,
//         quantity : quantity
//     })
//     const savePlant=await newPlant.save()
//     // console.log(savePlant)
//     return response.status(201).json({note : "plant purchase added", details : savePlant})
// }catch(err){
//     console.error(err.message)
//     // console.log(PlantPurchaseSchema,"500")
//     return response.status(500).json({note : "Error in purchase collection", details : err.message})
// }
// })

// PlantRouter.get('/buy/:userid/:plantid',Authentication,async(request,response)=>{
//     const UserId=request.params.userid;
//     const plantId=request.params.plantid;
//    try{
//     const correctplant=await PlantPurchaseSchema.findOne({UserId,plantId}).populate('plants.plantId')
//     if(!correctplant){
//         return response.status(404).json({note : "No document found in collection"})
//     }
//     return response.status(200).json({correctplant})
//    }catch(err){
//     return response.status(500).json({error : err.message})
//    }
// })

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
