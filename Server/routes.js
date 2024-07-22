const express=require("express");
const app=express();
const Authentication=require("./Authentication/ProtectRoutes");
const PlantRouter=require("./Routers/PlantRoutes");
const UsersRoutes=require("./Routers/UsersRoutes");
const ExpRoutes=require("./Routers/ExpRoutes");
const CartRoutes=require("./Routers/CartRoutes");

app.use(express.json());
app.use("/api/users",UsersRoutes);
app.use("/plant",PlantRouter);
app.use("/",Authentication,ExpRoutes);
app.use("/cart",Authentication,CartRoutes);


module.exports=app;