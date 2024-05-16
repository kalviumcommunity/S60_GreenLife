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
                  <input type="text" className="box-border w-64 p-2 border-2"/>
                </div>
            )
        })}
        </div>
    )
}
export default Experience