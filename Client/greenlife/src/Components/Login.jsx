import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Navbar from "./Navbar";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import  {auth}  from "../Firebase/firebase";
function Login(){

    const[Gmail,setmail]=useState("");
    const[Password,setpassword]=useState("");
    const[user,setuser]=useState(null);
    const[display,setdisplay]=useState(false);
    const[confrim,setconfrim]=useState("");
    const Nextpage=useNavigate()

const RecordMail=(event)=>{
setmail(event.target.value)
}

const Recordpassword=(event)=>{
    setpassword(event.target.value)
}

const RecordConfrim=(event)=>{
    setconfrim(event.target.value)
}

const Onlogin=async (event)=>{
event.preventDefault();
try{
    if(user && Password==confrim){
        const responded=await axios.post("http://localhost:3000/api/users/login",{Gmail:user.email,Password:confrim})
        localStorage.setItem("token",responded.data.jwtToken);
        Nextpage("/order")
    }else{
        const responded=await axios.post("http://localhost:3000/api/users/login",{Gmail,Password})
        localStorage.setItem("token",responded.data.jwtToken);
        Nextpage("/order")
    }

}catch(error){
console.log("login route frontend err:",error)
toast.error("Login failed")
}
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



return(
<div>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen min-w-full bg-gray-200">
      <div className="flex w-1/2 h-1/2">
        <div className="w-100 bg-white p-5">
          <div>
            <div><img src="https://i.postimg.cc/WzTXNF67/Capstone-Project-1.png" alt="logo" className="min-w-max"/> </div>
          </div>
          <div className="mt-12 flex flex-col items-center">
          <button className="bg-green-200 flex w-60 h-10 justify-center items-center" onClick={HandleGoogleSignin}> 
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="logo" className="h-7 mr-3" />
             <span className="text-xs">Sign in with google</span>
          </button>
      </div>
      <div className="mx-auto max-w-xs">
      {!display&&!user?
        (
        <div className="mx-auto max-w-xs">
        <p className=" px-2 text-sm text-gray-600 font-medium bg-white transform translate-y-1/2 mt-5 mb-10">Or Sign in with email</p>
        <input type="email"  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mr-64" placeholder="Email" onChange={RecordMail}/>
       <input type="password"  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5" placeholder="Password" onChange={Recordpassword}/>
       <button className="mt-5 bg-yellow-400" onClick={Onlogin}>Log in</button>
            <p className="mt-1">Do not have a account, prefer to <a href="/signup">Signup</a></p>
        </div>)
       :(
        <div className="mx-auto max-w-xs">
           <p className="px-2 text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2 mt-5 mb-8">Welcome back <b className="text-green-600">{user.displayName}</b>, Please enter your password</p>
        <input type="password"  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mr-64" placeholder="Password" onChange={RecordConfrim}/>
       <input type="password"  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5" placeholder="Confrim Password" onChange={Recordpassword}/>
       <button className="mt-5 bg-yellow-400" onClick={Onlogin}>Log in</button>
       <p className="mt-1">Do not have a account, prefer to <a href="/signup">Signup</a></p>
        </div>
       )
      }
      </div>
      </div>
       <img src="https://burst.shopifycdn.com/photos/basil-leaves-glisten-faintly-from-raindrops.jpg?width=925&exif=0&iptc=0" alt="leafs" className="bg-cover w-1/2"/>
      </div>
    </div>
</div>
)
}
export default Login;