const express=require("express");
const app=express();
const {SchemaModel}=require("./mongoConnect")
app.get("/get",(request,response)=>{
    // response.send("This is a get request")
    SchemaModel.find({})
    .then((plantlist)=>{response.json({plantlist})})
    .catch((err)=>{response.json({err})})
})
app.put("/put/:id",(request,response)=>{
    response.send("This is a put request")
})
app.post("/post",(request,response)=>{
    response.send("This  is a post request")
})
app.delete("/delete",(request,response)=>{
    response.send("This is a delete request")
})
module.exports=app;