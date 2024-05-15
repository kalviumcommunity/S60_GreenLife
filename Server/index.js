const express=require("express")
const App=express()
const cors=require("cors");
const {Connection,SchemaModel}=require("./mongoConnect")
const RoutesFile=require("./routes")
App.use(cors());
App.use("/",RoutesFile)

function RecordStatus(){
    SchemaModel.db.readyState===1;
}

App.get("/",(request,response)=>{
    let getboolean=RecordStatus?"Successfully, connected db to your server.":"Please try connect again."
    response.send(getboolean)
    // response.send("A basic route")
})

App.listen(3000,()=>{
    Connection();
    console.log("Server is running correctly")
})
