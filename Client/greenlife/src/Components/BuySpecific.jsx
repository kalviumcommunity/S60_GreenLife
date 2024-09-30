import Navbar from "./Navbar";
import axios from "axios";
import { useState,useEffect } from "react";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";



function BuySpecificPlant(){

    const {userid}=useParams();
    const[id,setid]=useState("");
   const[name,setname]=useState("");
   const[img,setimg]=useState("");
    const[click,setclick]=useState(false);
    const[plant,setplants]=useState([]);

    const jwtToken=localStorage.getItem("token");

    useEffect(()=>{
        if(jwtToken){
            const getcartitems=async ()=>{
                       try{
            const list= await axios.get(`http://localhost:3000/cart/single/${userid}`,{
                headers : {
                    'x-auth-token': jwtToken
                }
            })
            setplants(list.data)
            console.log(list.data)
            setid(list.data.id)
        }catch(error){
           console.log("buy specific plant error:",error)
           console.log(userid,"userid")
           console.log(id,"id")
        }
            }
            getcartitems()
        }
    },[userid,jwtToken])

useEffect(()=>{
    const getplantdetails=async()=>{
      try{
        const details=await axios.get(`http://localhost:3000/plant/getplant/${id}`,{
            headers : {
                'x-auth-token' : jwtToken
            }
        })
        setname(details.data.plant.PlantName)
        setimg(details.data.plant.PlantImage)
      }catch(err){
        console.log("getplantdetails err:",err)
      }
    }
    getplantdetails()
},[id,jwtToken])

const SendMail=async()=>{
    try{
        const responded= await axios.get(`http://localhost:3000/api/users/${userid}`,{
            headers :{
                'x-auth-token':localStorage.getItem("token")
            }
        }
    )
    const mail=responded.data.gmail
        const postmail=await axios.post("http://localhost:3000/send-mail",{mail},{
            headers : {
                'x-auth-token': jwtToken
            }
        })
        console.log(postmail.data,"postmail")
        setclick(true);
        toast.success("Payment Successful")
    }catch(err){
        console.log("frontend issue in sending mail:",err)
    }
    }

    return(
        <div>
            <Navbar/>
                        <div className="border-4 border-gray-300 rounded-3xl mt-10 p-10">
                        <p className="font-bold text-2xl mb-5">{name}</p>
                        <img src={img} alt="plant image" className="h-80 w-full object-cover rounded-3xl"/>
                        <p><b>Each Plant Cost : </b>Rs.{plant.PlantCost}</p>
                        <p><b>Number of plants : </b>{plant.quantity}</p>
                        <p><b>Total Cost : </b>Rs.{plant.PlantCost*plant.quantity}</p>
                        <button className="mt-10 bg-yellow-300 border-yellow-300" onClick={SendMail}>Proceed with Online Payment</button>
                        </div>
                        {click?(<p className="text-2xl text-orange-400 font-bold mt-2">Thanks for shopping</p>):(<p></p>)}
        </div>
    )
}
export default BuySpecificPlant;