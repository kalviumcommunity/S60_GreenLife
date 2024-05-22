import Navbar from "./Navbar"
import { useState,useEffect } from "react";
import axios from "axios";

function Experience(){
const[users,setusers]=useState([])
const[experience,setexperience]=useState("")
const[file,setfile]=useState(null)

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
},[])

function handleinput(event){
setexperience(event.target.value)
}

async function handlefileUpload(event){
    const selectedfile=event.target.files[0];
    setfile(selectedfile);
}

const postUrExp=async (event)=>{
    event.preventDefault()
    try{
        let image="";
        if(file){
            const createdData= new FormData();
            createdData.append("file",file)
            createdData.append("upload_preset","x31quij6")
    
            const fileupload=await axios.post("https://api.cloudinary.com/v1_1/dg6izvre4/image/upload",createdData)
            image=fileupload.data.secure_url;
        }
        console.log(image)
    const newdata= await axios.post("http://localhost:3000/postexp",{experience,image})
        setexperience("")
        setfile(null)
        setusers([...users,newdata.data])
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
                <div key={user._id} className="rounded-3xl border-2 mt-20 p-4 flex h-72 bg-slate-100">
                  <p className="m-5">{user.experience}</p>
                 <img src={user.image} alt="" className="h-50 w-70 rounded-3xl"/>
                </div>
            )
        })}
        </div>
        <div className="flex justify-center fixed bottom-0 left-0 w-11/12 ">
        <label htmlFor="inputUrfiles" className="cursor-pointer">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRxjZhawty_IUsjt2xke_qk2AIZCpVd7luGJrTo-emag&s" alt="" className="w-12 h-12 cursor-pointer"/>   
        <input type="file" onChange={handlefileUpload} id="inputUrfiles" accept="image/*" className="hidden"/>
        </label>
        <input type="text" className="border-black p-3 mb-4 w-3/4 bg-green-200"  onChange={handleinput} placeholder="Enter you experience" value={experience}/>
        <img src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-squares-01/3/89-512.png" alt="" className="w-12 h-12 cursor-pointer" onClick={postUrExp}/>
        </div>
        </div>
    )
}
export default Experience;