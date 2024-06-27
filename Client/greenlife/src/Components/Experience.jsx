import Navbar from "./Navbar"
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Experience(){
const[users,setusers]=useState([])
const[experience,setexperience]=useState("")
const[file,setfile]=useState(null)
const[needtoupdate,setneedtoupdate]=useState(false);
const[updateExp,setupdateExp]=useState("");
const[updatefile,setupdatefile]=useState(null);
const[id,setid]=useState(null)
const switchpage=useNavigate();


useEffect(()=>{
    const getusers=async()=>{
        const jwtToken=localStorage.getItem("token")
        if(!jwtToken){
         switchpage("/NotAuthenticated")
         return;
        }
        try{
        const dataofusers=await axios.get("http://localhost:3000/getexp",{
            headers : {
                'x-auth-token' : jwtToken,
            }
        })
        setusers(dataofusers.data.listexp)
        }
        catch(err){
            console.log("err exp get:",err)
        }
    }
    getusers()
},[])


const UpdateRequest=async()=>{
    if (!id) return; 
    const userneedupdate=users.find(user=>user._id===id)
    if(!userneedupdate) return;
    try{
        let image=updatefile;
        if(updatefile && updatefile!==users.find(user=>user._id===id).image){
        var createdData=new FormData();
        createdData.append("file",updatefile);
        createdData.append("upload_preset","x31quij6");
        var generatefilelink=await axios.post("https://api.cloudinary.com/v1_1/dg6izvre4/image/upload",createdData);
        image=generatefilelink.data.secure_url;
    }
    var updatedData=await axios.put(`http://localhost:3000/updateExp/${id}`,{experience : updateExp,image})
    const updatedExp=updatedData.data
    setusers(users.map((user) => user._id === id ? { ...user, experience: updatedExp.experience, image: updatedExp.image } : user));
    setneedtoupdate(false);
    setupdateExp("");
    setupdatefile(null);
    setid(null);
}
    catch(err){
console.log("Update Exp err:",err) 
    }
}

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
}catch(err){
    console.log("PostExp err:",err)
}

}

const deleteRequest=(id)=>{
try{
    axios.delete(`http://localhost:3000/deleteExp/${id}`)
    setusers(users.filter((user)=>user._id!==id))

}catch(err){
    console.log("delete Exp err:",err)
}
}

    return(
        <div>
            <div>
            <Navbar/>
            </div>
            <div>
        {users.map((user)=>{
            if (!user) return null;
            return(
                <div key={user._id} className="rounded-3xl border-2 mt-20 p-4 flex h-72 bg-slate-100">
                  <p className="m-5">{user.experience}</p>
                 <img src={user.image} alt="" className="h-50 w-70 rounded-3xl"/>
                 <div>
                 <button className="mb-20" onClick={()=>{
                    setneedtoupdate(true);
                    setupdateExp(user.experience);
                    setupdatefile(user.image);
                    setid(user._id);
                 } }>Update</button>
                 <button onClick={()=>deleteRequest(user._id)} className="mt-20">Delete</button>
                 </div>
                </div>
            )
        })}
        </div>
        <div className="flex justify-center fixed bottom-0 left-0 w-11/12 ">
        <label htmlFor="inputUrfiles" className="cursor-pointer">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRxjZhawty_IUsjt2xke_qk2AIZCpVd7luGJrTo-emag&s" alt="" className="w-12 h-12 cursor-pointer"/>   
        <input type="file" onChange={needtoupdate?(e)=>setupdatefile(e.target.files[0]):handlefileUpload} id="inputUrfiles" accept="image/*" className="hidden"/>
        </label>
        <input type="text" className="border-black p-3 mb-4 w-3/4 bg-green-200"  onChange={needtoupdate?(e)=>setupdateExp(e.target.value):handleinput} placeholder="Enter you experience"   value={needtoupdate ? updateExp : experience}/>
        <img src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-squares-01/3/89-512.png" alt="" className="w-12 h-12 cursor-pointer" onClick={needtoupdate?UpdateRequest:postUrExp}/>
        </div>
        </div>
    )
}
export default Experience;