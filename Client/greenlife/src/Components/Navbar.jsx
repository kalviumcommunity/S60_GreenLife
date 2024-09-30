import { NavLink,useNavigate } from "react-router-dom";
import React from "react";


function Navbar(){

  const Nextpage = useNavigate()

const OnLogout=()=>{
  const token=localStorage.getItem("token");
  if(token){
  localStorage.removeItem("token");
  alert("LogOut is successful");
  Nextpage("/login");
  }else{
    alert("Logout Failed")
  }
}

    return(
  <div>
        <nav className='flex items-center bg-red-50 h-12 w-full fixed top-0 left-0 justify-around'>
        <NavLink to="/">
          <p><img src="https://i.postimg.cc/4N1Xqpyx/Capstone-Project-1-removebg-preview.png" alt="" className='h-12 w-35 cursor-pointer'/></p>
          </NavLink>
          <NavLink to="/login">
          <p className=' text-xl cursor-pointer'>Login</p>
          </NavLink>
          <NavLink to="/Experience">
          <p className='cursor-pointer text-xl'>Experiences</p>
          </NavLink>
          <NavLink to="/about">
          <p className='cursor-pointer text-xl'>About</p>
          </NavLink>
          <p className='text-red-500 text-xl font-semibold cursor-pointer' onClick={OnLogout}>LogOut</p>
        </nav>
        <div className='bg-green-900 text-white fixed w-full left-0 text-center h-30 top-12'>Create a spring in your life.</div>
        </div>
    )
}

export default Navbar;