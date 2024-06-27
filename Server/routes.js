const express=require("express");
const app=express();
const Authentication=require("./Authentication/ProtectRoutes")
const PlantRouter=require("./Routers/PlantRoutes");
const UsersRoutes=require("./Routers/UsersRoutes");
const ExpRoutes=require("./Routers/ExpRoutes")

app.use(express.json());
app.use("/api/users",UsersRoutes);
app.use("/plant",PlantRouter);
app.use("/",Authentication,ExpRoutes);

module.exports=app;