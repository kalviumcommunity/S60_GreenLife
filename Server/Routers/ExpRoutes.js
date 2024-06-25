const express=require("express");
const {ExpModel}=require("../mongoConnect");
const {check,validationResult}=require("express-validator");

const ExpRouter=express.Router()

const validationRules=[
    check("experience","Enter a experience of 5 characters long").isLength({min : 5}),
    check("image","Image is required").not().isEmpty()
]

ExpRouter.get("/getexp",(request,response)=>{
    ExpModel.find({})
    .then((listexp)=>{response.json({listexp})})
    .catch((err)=>{response.json({err})})
})

ExpRouter.post("/postexp",validationRules,async (request,response)=>{

    const validationError=validationResult(request);
    if(!validationError.isEmpty()){
        return response.status(400).json({validationError : validationError.array()})
    }
    ExpModel.create(request.body)
    .then(data=>{response.json(data)})
    .catch(err=>{response.json(err)})
})

ExpRouter.delete("/deleteExp/:id", async(request,response)=>{
    const id=request.params.id;
    ExpModel.findByIdAndDelete({_id : id})
    .then(data=>{response.json(data)})
    .catch(err=>{response.json(err)})
})

ExpRouter.put("/updateExp/:id",validationRules,(request,response)=>{

    const validationError=validationResult(request);
    if(!validationError.isEmpty()){
        return response.status(400).json({validationError : validationError.array()})
    }

    const id=request.params.id;
    ExpModel.findByIdAndUpdate(id,{
            experience : request.body.experience,
            image : request.body.image
    })
    .then(data=>{response.json(data)})
    .catch(err=>{response.json(err)})

})
module.exports=ExpRouter
