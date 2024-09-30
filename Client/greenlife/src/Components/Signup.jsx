import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import React from "react";
import {toast} from "react-toastify";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase/firebase";

function Signup(){
const[UserName,setusername]=useState("")
const[Gmail,setgmail]=useState("")
const[Password,setpassword]=useState("")
const[display,setdisplay]=useState(false);
const[user,setuser]=useState(null);
const[confrim,setconfrim]=useState("")
const[err,seterr]=useState("")
const switchTo = useNavigate()

const Usernamechanges=(event)=>{
    setusername(event.target.value)
}
const gmailchanges=(event)=>{
    setgmail(event.target.value)
}
const passwordchanges=(event)=>{
    setpassword(event.target.value)
}
const Confrimchanges=(event)=>{
    setconfrim(event.target.value)
}

const HandleGoogleSignin= async()=>{
    try{
        const GoogleProvider=await new GoogleAuthProvider()
        const details=await signInWithPopup(auth,GoogleProvider)
        console.log(details.user)
        setdisplay(true)
        setuser(details.user)
    }catch(err){
        console.log("signin with google err:",err)
    }

}

    const postUsers=async (event)=>{
        event.preventDefault();
       try{
        if(Password===confrim){
        if(user){
            const responded=await axios.post("http://localhost:3000/api/users/postuser",{UserName:user.displayName,Gmail:user.email,Password})
            setusername("")
            setgmail("")
            setpassword("")
            setconfrim("")
            seterr("")
            localStorage.setItem("token",responded.data.jwtToken);
            switchTo("/order")

        }else{
            const responded=await axios.post("http://localhost:3000/api/users/postuser",{UserName,Gmail,Password})
            setusername("")
            setgmail("")
            setpassword("")
            setconfrim("")
            seterr("")
            localStorage.setItem("token",responded.data.jwtToken);
            switchTo("/order")  
        }
        }
        else{
      seterr("Password and confrim password did not match")
        } 
       } 
       catch(error){
        console.log("post users err:",error)
        toast.error("Signup failed")
       }
    
    }
    return(
        <div className="flex">          
        <div className="bg-left w-full h-screen">
            <img src="https://imgcdn.floweraura.com/types-of-indoor-plant-types-cover-image.jpg" alt="" className="w-full h-full"/>
        </div>
    <div className="absolute left-1/3 top-1/3 border-2 black bg-white pr-20 pt-20 pl-20 pb-20">
        <div>
        <Navbar/>
        </div>
        <div>
        <p>{err}</p>
        <h3>SignUp</h3>
        {display && user?(
<div>
    Please enter password {user.displayName}
    <div>
            <input type="text" className="border-2 black mb-5" placeholder="Password" onChange={passwordchanges}/>
            </div>
            <div>
            <input type="password" className="border-2 black mb-5" placeholder="Confrim Password" onChange={Confrimchanges}/>
            </div>
</div>
):(<div>
    <div>
         <input type="text" className="border-2 black mb-5" placeholder="UserName" onChange={Usernamechanges} value={UserName}/>
        </div>
        <div>
        <input type="mail" className="border-2 black mb-5" placeholder="Email" onChange={gmailchanges} value={Gmail}/>
        </div>
        <div>
        <input type="password" className="border-2 black mb-5" placeholder="Password" onChange={passwordchanges} value={Password}/>
        </div>
        <div>
        <input type="password" className="border-2 black mb-5" placeholder="Confrim Password" onChange={Confrimchanges} value={confrim}/>
        </div>
</div>)}
        <button className="bg-yellow-300" onClick={postUsers}>SignUp</button>
        <p>OR</p>
             <button className="bg-green-200 flex w-60 h-10 justify-center items-center" onClick={HandleGoogleSignin}> 
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="logo" className="h-7 mr-3" />
             <span className="text-xs">Sign in with google</span>
          </button>
    </div>
    </div>
    </div>
    )
}
export default Signup;