import { NavLink,useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Navbar from "./Navbar";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase/firebase";
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
        alert("Your Login is successful")
        Nextpage("/order")
    }else{
        const responded=await axios.post("http://localhost:3000/api/users/login",{Gmail,Password})
        localStorage.setItem("token",responded.data.jwtToken);
        alert("Your Login is successful")
        Nextpage("/order")
    }

}catch(error){
console.log("login route frontend err:",error)
alert("Login failed")
}
}


const HandleGoogleSignin= async()=>{
    try{
        const GoogleProvider=await new GoogleAuthProvider()
        const details=await signInWithPopup(auth,GoogleProvider)
        console.log(details.user)
        setuser(details.user)
    }catch(err){
        console.log("signin with google err:",err)
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
            <h3>Login</h3>
{!display && user?(
<div>
    Please enter password {user.displayName}
    <div>
            <input type="text" className="border-2 black mb-5" placeholder="Password" onChange={Recordpassword}/>
            </div>
            <div>
            <input type="password" className="border-2 black mb-5" placeholder="Confrim Password" onChange={RecordConfrim}/>
            </div>
</div>
):(<div>
    <div>
            <input type="text" className="border-2 black mb-5" placeholder="Email" onChange={RecordMail}/>
            </div>
            <div>
            <input type="password" className="border-2 black mb-5" placeholder="Password" onChange={Recordpassword}/>
            </div>
</div>)}
            <NavLink to="/order">
            <button className="bg-yellow-300" onClick={Onlogin}>Login</button>
            </NavLink>
            <p>OR</p>
            <button onClick={HandleGoogleSignin}>Signin with google</button>
            <p>Do not have a account, prefer to <a href="/signup">Signup</a></p>
        </div>
        <div className="bg-right bg-green-400 h-screen w-full"></div>
        </div>
    )
}
export default Login;