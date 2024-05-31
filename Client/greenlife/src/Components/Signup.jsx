import { NavLink } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function Signup(){
const [UserName,setusername]=useState("")
const[Gmail,setgmail]=useState("")
const[Password,setpassword]=useState("")
const[confrim,setconfrim]=useState("")
const[err,seterr]=useState("")

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

    const postUsers=async (event)=>{
        event.preventDefault();
       try{
        if(Password===confrim){
       await axios.post("http://localhost:3000/postuser",{UserName,Gmail,Password})
       setusername("")
       setgmail("")
       setpassword("")
       setconfrim("")
       seterr("")
        }
        else{
      seterr("Password and confrim password did not match.")
        } 
       } catch(err){
        console.log("post users err:",err)
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
        <NavLink to="/order">
        <button className="bg-yellow-300" onClick={postUsers}>SignUp</button>
        </NavLink>
    </div>
    <div className="bg-right bg-green-400 h-screen w-full"></div>
    </div>
    )
}
export default Signup;