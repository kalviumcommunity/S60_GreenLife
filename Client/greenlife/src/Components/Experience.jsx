import Navbar from "./Navbar"
import { useState,useEffect } from "react";
import axios from "axios";

function Experience(){
const[users,setusers]=useState([])

useEffect(()=>{
    const getusers=async()=>{
        try{
        const dataofusers=await axios.get("http://localhost:3000/getexp")
        setusers(dataofusers.data.listexp)
        }
        catch(err){
            console.log("err exp front:",err)
        }
    }
    getusers()
})
    return(
        <div>
            <div>
                <Navbar/>
            </div>
        {users.map((user)=>{
            return(
                <div key={user._id}>
                  <p className="m-10">{user.experience}</p>
                </div>
            )
        })}
        </div>
    )
}
export default Experience