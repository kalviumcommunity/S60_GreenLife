import { NavLink } from "react-router-dom"

function Navbar(){
    return(
  <div className='mainbody'>
        <nav className='flex items-center bg-red-50 h-12 w-full fixed top-0 left-0 justify-around'>
        <NavLink to="/">
          <p><img src="https://i.postimg.cc/4N1Xqpyx/Capstone-Project-1-removebg-preview.png" alt="" className='h-12 w-35 cursor-pointer'/></p>
          </NavLink>
          <NavLink to="/login">
          <p className=' text-xl cursor-pointer'>Login</p>
          </NavLink>
          <NavLink to="/Signup">
          <p className='cursor-pointer text-xl'>SignUp</p>
          </NavLink>
          <NavLink to="/Blog">
          <p className='cursor-pointer text-xl'>Blog</p>
          </NavLink>
        </nav>
        <div className='bg-green-900 text-white fixed w-full left-0 text-center h-30 top-12'>Create a spring in your life.</div>
        </div>
    )
}

export default Navbar;