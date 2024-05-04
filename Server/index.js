const express=require("express")
const App=express()
const {Connection}=require("./mongoConnect")
const RoutesFile=require("./routes")
App.use("/",RoutesFile)

App.get("/",(request,response)=>{
    response.send("A basic route")
})

App.listen(3000,()=>{
    Connection();
    console.log("Server is running correctly")
})
