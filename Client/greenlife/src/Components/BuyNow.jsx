import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function BuyNow(){
    const {id}=useParams();
    const[Totalcost,setTotalcost]=useState(0);
    const[click,setclick]=useState(false);
    const[plant,setplants]=useState([]);

    const jwtToken=localStorage.getItem("token");

    useEffect(()=>{
        if(jwtToken){
            const getcartitems=async ()=>{
                       try{
            const list= await axios.get(`http://localhost:3000/cart/get/${id}`,{
                headers : {
                    'x-auth-token': jwtToken
                }
            })
            let TotalCost=0;
            let arr=[]
            list.data.plants.forEach(i=>{
                let eachplantcost=i.PlantCost;
                let eachquantity=i.quantity;
                let eachimage=i.id.PlantImage;
                let eachplantname=i.id.PlantName;
                arr.push({Name:eachplantname, Number:eachquantity, Cost:eachplantcost*eachquantity, Image:eachimage})
                TotalCost+=eachplantcost*eachquantity
            })
            console.log(arr,"array")
            setplants(arr);
            setTotalcost(TotalCost)
        }catch(error){
           console.log("cart get error:",error)
        }
            }
            getcartitems()
        }
    },[id,jwtToken])

const SendMail=async()=>{
try{
    const responded= await axios.get(`http://localhost:3000/api/users/${id}`,{
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
         {click?(<p className="text-2xl text-orange-400 font-bold">Thanks for shopping</p>):(<p></p>)}
            <div className="flex items-center justify-around">
                <div>
                                <table>
                                    <thead>
                                        <tr>
                                        <th className="py-2 px-4 border-b">Plant Name</th>
                                        <th className="py-2 px-4 border-b">Plant Image</th>
                                        <th className="py-2 px-4 border-b">Number of Plants</th>
                                        <th className="py-2 px-4 border-b">Plants Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {plant.map((p,id)=>{
                                        return(
                                            <tr key={id}>
                                               <td className="py-2 px-4 border-b">{p.Name}</td>
                                               <td className="py-2 px-4 border-b"><img src={p.Image} alt="Plant Image" className="h-10 w-10" /></td>
                                               <td className="py-2 px-4 border-b">{p.Number}</td>
                                               <td className="py-2 px-4 border-b">{p.Cost}</td>
                                            </tr>
                                        )
                                      })}
                                    </tbody>
                                </table>
                </div>

            </div>
            <hr className="border border-gray-900"/>
            <p className="mb-10"><b>Total Cost :</b>{Totalcost}</p>
            <button onClick={SendMail} className="bg-yellow-300 border-yellow-300">Proceed with Online Payment</button>
        </div>
    )
}

export default BuyNow;