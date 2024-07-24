import Navbar from "./Navbar";
import {jwtDecode} from "jwt-decode";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";


function Order(){
    const[opt,selectedopt]=useState("All Plants");
    const[name,setname]=useState(""||"User");
    const[PlantsData,setplantsdata]=useState([]);
    const[id,setid]=useState("");
    const Nextpage=useNavigate();

    const jwt=localStorage.getItem("token")
    useEffect(
        ()=>{
            if(jwt){
                try{
                    const decodedvalue=jwtDecode(jwt);
                if(decodedvalue && decodedvalue.NewUser && decodedvalue.NewUser.id){
                    const userId=decodedvalue.NewUser.id;
                    SpecificUser(userId)
                    setid(userId)
                }else{
                    console.log("Invalid token exists in localstorage")
                    console.log(decodedvalue)
                    console.log(decodedvalue.NewUser)
                    console.log(decodedvalue.NewUser.id)
                }
                }catch(error){
                    console.log("jwt token error in frontend:",error)
                }
            }else{
                console.log("There is nothing in localstorage")
            }
        },[])
        // console.log(id,"userid from order page")

   const SpecificUser=async(userid)=>{
try{
    const responded= await axios.get(`http://localhost:3000/api/users/${userid}`,{
        headers :{
            'x-auth-token':localStorage.getItem("token")
        }
    }
)
setname(responded.data.username)
}catch(error){
    console.log("Specific user details error in frontend:",error)
}
   }

    useEffect(()=>{
        const data=async()=>{
            try{
                const plantsdata=await axios.get("http://localhost:3000/plant/get")
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


    function GiveRatings(x){
        let ratings="";
        for(let i=0; i<5; i++){
            if(i<x){
                ratings += "⭐"
            }
            else{
                ratings+="☆"        }
        }
        return ratings;

    }
function DirectNextPage(){
    if(!jwt){
        Nextpage('/NotAuthenticated')
    }else{
        Nextpage(`/YourGarden/${id}`)
    }
}
    return(
        <div>
            <Navbar/>
            <button className="right-8 bottom-5 bg-orange-400 fixed" onClick={DirectNextPage}>View garden</button>
            <p className="m-10 text-xl font-medium">Welcome {name}<br></br>Dive into our diverse selection, discover expertly curated plants, and embark on a journey of growth and serenity. Happy planting!</p>
        <div className="grid grid-cols-3">
            {PlantsData && PlantsData.filter((each)=>opt === 'All Plants' || each.PlantFilter.includes(opt))
            .map((eachplant)=>{
                return(
                    <div key={eachplant._id} className="border-4 rounded-3xl m-8 p-7 flex flex-col items-center">
                    <img src={eachplant.PlantImage} alt="Plant Image" className="h-full w-full object-cover rounded-3xl" />
                    <b>{eachplant.PlantName}</b>
                    <p>{GiveRatings(eachplant.Rating)}</p>
                    <p>{eachplant.PlantCost}</p>
                    <Link to={`/plant/getplant/${eachplant._id}`}>
                    <button className="bg-green-400 text-white">Know more about Product</button>
                    </Link>
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