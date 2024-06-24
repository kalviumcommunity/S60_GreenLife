import { NavLink,useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Navbar from "./Navbar";
function Login(){

    const[Gmail,setmail]=useState("");
    const[Password,setpassword]=useState("");
    const Nextpage=useNavigate()

const RecordMail=(event)=>{
setmail(event.target.value)
}

const Recordpassword=(event)=>{
    setpassword(event.target.value)
}

const Onlogin=async (event)=>{
event.preventDefault();
try{
    const responded=await axios.post("http://localhost:3000/api/users/login",{Gmail,Password})
    localStorage.setItem("token",responded.data.jwtToken);
    alert("Your Login is successful")
    Nextpage("/order")

}catch(error){
console.log("login route frontend err:",error)
alert("Login failed")
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
            <div>
            <input type="text" className="border-2 black mb-5" placeholder="Email" onChange={RecordMail}/>
            </div>
            <div>
            <input type="password" className="border-2 black mb-5" placeholder="Password" onChange={Recordpassword}/>
            </div>
            <NavLink to="/order">
            <button className="bg-yellow-300" onClick={Onlogin}>Login</button>
            </NavLink>
            <p>Do not have a account, prefer to <a href="/signup">Signup</a></p>
        </div>
        <div className="bg-right bg-green-400 h-screen w-full"></div>
        </div>
    )
}
export default Login;