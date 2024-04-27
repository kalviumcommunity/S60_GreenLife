const express=require("express");
const app=express();
app.get("/get",(request,response)=>{
    response.send("This is a get request")
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