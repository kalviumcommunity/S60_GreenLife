import Navbar from "./Navbar";
// import PlantsData from "../SampleData";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Order(){
    const[opt,selectedopt]=useState("All Plants")
    const[PlantsData,setplantsdata]=useState([]);

    useEffect(()=>{
        const data=async()=>{
            try{
                const plantsdata=await axios.get("http://localhost:3000/get")
                setplantsdata(plantsdata.data.plantlist)
            }catch(err){
                console.log(err)
            }
        }
        data()
    },[])

    const getselectedopt=(event)=>{
         selectedopt(event.target.value);
    }

    return(
        <div>
            <Navbar/>
            <Link to="/YourGarden">
            <button className="right-8 bottom-5 bg-orange-400 fixed">View garden</button>
            </Link>
        <div className="grid grid-cols-3">
            {PlantsData && PlantsData.filter((each)=>opt === 'All Plants' || each.PlantFilter.includes(opt))
            .map((eachplant)=>{
                return(
                    <div key={eachplant._id} className="border-4 rounded-3xl m-10 p-10">
                    <img src={eachplant.PlantImage} alt="" className="h-50 w-70  rounded-3xl" />
                    <b>{eachplant.PlantName}</b>
                    <p>{eachplant.PlantCost}</p>
                    <p className="text-blue-500 cursor-pointer">Know More</p>
                    <button className="bg-green-400 text-white">Add to your garden</button>
                    </div>
                )
            })}
        </div>
        <select className="left-8 top-12 bg-green-300 fixed w-150" onChange={getselectedopt}>
  <option value="All Plants">All Plants</option>
  <option value="Indoor Plants">Indoor Plants</option>
  <option value="Outdoor Plants">Outdoor Plants</option>
  <option value="Air Purifying Plants">Air Purifying Plants</option>
  <option value="Flowering Plants">Floweing Plants</option>
  <option value="Fruit Plants">Fruit Plants</option>
  <option value="Medicinal Plants">Medicinal Plants</option>
  <option value="Succulents">Succulents</option>
  <option value="Pet Friendly Plants">Pet Friendly Plants</option>
</select>
        </div>
    )
}
export default Order;