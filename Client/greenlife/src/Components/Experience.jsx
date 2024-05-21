import Navbar from "./Navbar"
import { useState,useEffect } from "react";
import axios from "axios";

function Experience(){
const[users,setusers]=useState([])
const[experience,setexperience]=useState("")
// const[image,setlink]=useState("")

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

function handleinput(event){
setexperience(event.target.value)
}


const postUrExp=async (event)=>{
    event.preventDefault()
    try{
    const newdata= await axios.post("http://localhost:3000/postexp",{experience,/*image*/})
        setexperience("")
        console.log(newdata);
}catch(err){
    console.log("err:",err)
}
}
    return(
        <div>
            <div>
                <Navbar/>
            </div>
            <div>
        {users.map((user)=>{
            return(
                <div key={user._id} className="rounded-3xl border-2 mt-10 p-4 flex h-72 bg-green-300">
                  <p className="m-10">{user.experience}</p>
                  <img src={user.image} alt="" className="h-50 w-70 rounded-3xl"/>
                </div>
            )
        })}
        </div>
        <div className="flex justify-center fixed bottom-5 w-11/12">
        <input type="text" className="border-black p-3 mb-4 w-3/4"  onChange={handleinput} placeholder="Enter you experience" value={experience}/>
        <img src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-squares-01/3/89-512.png" alt="" className="w-10 h-15 cursor-pointer" onClick={postUrExp}/>
        </div>
        </div>
    )
}
export default Experience;