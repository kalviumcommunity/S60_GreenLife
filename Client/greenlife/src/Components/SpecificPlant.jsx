import {useState,useEffect} from "react";
import Navbar from "./Navbar";
import {jwtDecode} from "jwt-decode";
import { useParams,Link,useNavigate } from "react-router-dom";
import axios from "axios";

function SpecificPlant(){
const {id}=useParams();
const[data,setdata]=useState(null);
const[quantity,setquantity]=useState(1);
const[userid,setid]=useState("");
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
            console.log(id,"_id")
        }
    }
    Getdata()
},[id])

const jwt=localStorage.getItem("token")

useEffect(
    ()=>{
        if(jwt){
            try{
                const decodedvalue=jwtDecode(jwt);
            if(decodedvalue && decodedvalue.NewUser && decodedvalue.NewUser.id){
                const userId=decodedvalue.NewUser.id;
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

const AddtoCart=async (event)=>{
    event.preventDefault()
    try{
    const checkdata= await axios.get(`http://localhost:3000/cart/get/${userid}`,{
        headers : {
            'x-auth-token' : jwt,
        }
    })
   const cartstatus=checkdata.data;
//    console.log(cartstatus,"cartstatus")
   const savedplant=cartstatus.plants.find(item=>item.id===id)
   if(savedplant){
    console.log("Need to update successfully")
    const updatecount=savedplant.quantity+1
    const postcart= await axios.post(`http://localhost:3000/cart/post/${userid}`,{plants : [{id, quantity : updatecount}]},{
        headers : {
            'x-auth-token' : jwt,
        }
        })
    setquantity(updatecount)
    console.log("updated plant count successfully",postcart.data)
   }else{
    const postcart= await axios.post(`http://localhost:3000/cart/post/${userid}`,{plants : [{id, quantity : quantity}]},{
    headers : {
        'x-auth-token' : jwt,
    }
    })
    console.log("plants added to garden successfully",postcart.data)
   }
}catch(err){
    if(err.response.status===404){
        try{
            const postcart= await axios.post(`http://localhost:3000/cart/post/${userid}`,{plants : [{id, quantity : 1}]},{
                headers : {
                    'x-auth-token' : jwt,
                }
                })
                console.log("new cart created successfully",postcart.data)
        }catch(err){
            console.log("cannot create new cart",err)
        }
    }
}

}
const AddCount=()=>{
    setquantity(prev=>prev+1)
}
const SubCount=()=>{
    setquantity(prev=>(prev>=1?prev-1:1))
}

    return(
        <div>
            <Navbar/>
        <div>
           {data!==null?
           (<div className="flex">
            <div>
             <h2 className="p-7 mt-5 text-left text-4xl">{data.PlantName}</h2> 
             <img src={data.PlantImage} alt="Plant Image" className="h-96 rounded-3xl"/>
             <p className="text-red-600 font-bold text-2xl text-left mr-10 flex">Plant cost: {data.PlantCost}</p>
             <div className="flex justify-center">
              <button className="text-2xl px-1 py-1 mr-5" onClick={AddCount}>+</button>
              <p>{quantity}</p>
              <button className="text-2xl px-1 py-1 ml-5" onClick={SubCount}>-</button>
             </div>
             <button className="w-93 mt-5 bg-yellow-400 text-left" onClick={AddtoCart}>Plant in my garden</button><br></br>
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