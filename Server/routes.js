const express=require("express");
const app=express();
const {SchemaModel,ExpModel,UsersModel}=require("./mongoConnect")

app.use(express.json())

app.get("/get",(request,response)=>{
    // response.send("This is a get request")
    SchemaModel.find({})
    .then((plantlist)=>{response.json({plantlist})})
    .catch((err)=>{response.json({err})})
})

app.get("/getexp",(request,response)=>{
    ExpModel.find({})
    .then((listexp)=>{response.json({listexp})})
    .catch((err)=>{response.json({err})})
})

app.post("/postexp",async (request,response)=>{
    ExpModel.create(request.body)
    .then(data=>{response.json(data)})
    .catch(err=>{response.json(err)})
})

app.delete("/deleteExp/:id", async(request,response)=>{
    const id=request.params.id;
    ExpModel.findByIdAndDelete({_id : id})
    .then(data=>{response.json(data)})
    .catch(err=>{response.json(err)})
})

app.put("/updateExp/:id",(request,response)=>{
    const id=request.params.id;
    ExpModel.findByIdAndUpdate(id,{
            experience : request.body.experience,
            image : request.body.image
    })
    .then(data=>{response.json(data)})
    .catch(err=>{response.json(err)})
})

app.post("/postuser",(request,response)=>{
    UsersModel.create(request.body)
    .then(data=>{response.json(data)})
    .catch(err=>{response.json(err)})
})

app.put("/put/:id",(request,response)=>{
    response.send("This is a put request")
})

app.post("/post",(request,response)=>{
    response.send("This  is a post request")
})

app.delete("/delete/:id",(request,response)=>{
    response.send("This is a delete request")
})

module.exports=app;