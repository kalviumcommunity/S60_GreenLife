import axios from "axios";
import Navbar from "./Navbar";
import {useState,useEffect} from "react";
import CartCards from "./CartCards";
import { useStoredState } from "../Context Provider/CreateContext";
import { useNavigate, useParams, Link } from "react-router-dom";


function ViewGarden(){

    const {next}=useNavigate()
    const {id}=useParams()
    const {setlength}=useStoredState();
    const[jwtToken,settoken]=useState("")
    const[cart,setcart]=useState(null)

    useEffect(()=>{
        const secure=async()=>{
          const findtoken=localStorage.getItem("token")
          settoken(findtoken)
          console.log("findtoken",findtoken);
          console.log("useState",jwtToken);
          if(!findtoken){
               next("/NotAuthenticated")
               return;
          }
    }
    secure()},[])

    useEffect(()=>{
        if(jwtToken){
            const getcartitems=async ()=>{
                       try{
            const cartlist= await axios.get(`http://localhost:3000/cart/get/${id}`,{
                headers : {
                    'x-auth-token': jwtToken
                }
            })
            setcart(cartlist.data.plants)
            setlength(cartlist.data.plants.length)
            // AddId(cartlist.data.plants)
        }catch(error){
           console.log("cart get error:",error)
        }
            }
            getcartitems()
        }
    },[id,jwtToken])
    console.log(cart)

    const deleteRequest=(plantid)=>{
        try{
            axios.delete(`http://localhost:3000/cart/delete/${id}/${plantid}`,{
                headers : {
                    'x-auth-token' : jwtToken
                }
            })
            setcart(cart.filter((user)=>user.id._id!==plantid))
        
        }catch(err){
            console.log("delete cart plant err:",err)
        }
        }

    return(
        <div>
            <div>
                <Navbar/>
            </div>
            <div className="grid grid-cols-3 mt-10">
                {cart && cart.map((each)=>{
                    if (!each) return null;
                    return(
                        <div key={each._id}>
                            <CartCards plantid={each.id._id}></CartCards>
                            <p>Number of plants: {each.quantity}</p>
                            <button className="bg-red-400 mt-3" onClick={()=>deleteRequest(each.id._id)}>Delete</button>
                        </div>
                    )
                })}
            </div>
            <Link to={`/Buynow/${id}`}>
            <button className="right-8 bottom-5 bg-orange-400 fixed">Buy Now</button>
            </Link>
        </div>
    )
}
export default ViewGarden