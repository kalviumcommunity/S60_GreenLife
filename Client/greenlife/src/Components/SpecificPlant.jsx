import {useState,useEffect} from "react";
import Navbar from "./Navbar";
import { useParams,Link,useNavigate } from "react-router-dom";
import axios from "axios";

function SpecificPlant(){
const {id}=useParams();
const[data,setdata]=useState(null);
const nextPage=useNavigate();

useEffect(()=>{
    const Getdata=async()=>{
        const jwtToken=localStorage.getItem("token")
        if(!jwtToken){
            nextPage("/NotAuthenticated")
            return;
        }
        try{
            const respond=await axios.get(`http://localhost:3000/plant/getplant/${id}`,{
                headers : {
                    'x-auth-token' : jwtToken,
                }
            })
            // console.log(respond.data)
            setdata(respond.data.plant)
        }catch(error){
            console.log("Specific component error:",error)
        }
    }
    Getdata()
},[id])
    return(
        <div>
            <Navbar/>
        <div>
           {data!==null?
           (<div className="flex">
            <div>
             <h2 className="p-7 mt-5 text-left text-4xl">{data.PlantName}</h2> 
             <img src={data.PlantImage} alt="Plant Image" className="h-96 rounded-3xl"/>
             <p className="text-red-600 font-bold text-2xl text-left mr-10">Plant cost : {data.PlantCost}</p>
             <button className="w-93 mt-5 bg-yellow-400 text-left">Plant in my garden</button><br></br>
             <button className="mt-5 bg-orange-500 px-14">Buy Now</button>
             </div>
              <div className="mt-20 ml-10">
                <div className="border-b-green-600 border-r-green-600 border-4 p-2">
                <p className="text-green-500">🌿Plant Uses and Benefits🌿</p>
                <p>{data.Uses}</p>
                </div>
                <div className="border-b-green-600 border-r-green-600 border-4 p-2 mt-5">
                    <p className="text-blue-500">💧Water Requirement💧</p>
                    <p>{data.WateringTips}</p>
                </div>
                <div className="border-b-green-600 border-r-green-600 border-4 p-2 mt-5">
                    <p className="text-yellow-500">🌞Sunlight Requirement🌤️</p>
                    <p>{data.WateringTips}</p>
                </div>
                <div className="border-b-green-600 border-r-green-600 border-4 p-2 mt-5">
                    <p className="text-orange-700">⚠️Toxicity Levels</p>
                    <p>{data.Toxicity}</p>
                </div>
                <Link to={data.ReferenceLink}>
                <div className="border-b-green-600 border-r-green-600 border-4 p-2 mt-5">
                    <p>Need more Information, Refer Wikepedia📚</p>
                    <p>{data.ReferenceLink}</p>
                </div>
                </Link>
              </div>
           </div>)
           :
           (<div>Loading...</div>)
           }
        </div>
        </div>
    )
}
export default SpecificPlant;