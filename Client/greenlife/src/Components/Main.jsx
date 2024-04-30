import { Link } from "react-router-dom"

function Main(){
    return(
        <div className='mainbody'>
        <nav className='flex items-center bg-red-50 h-12 w-full fixed top-0 left-0 justify-around'>
          <p><img src="https://i.postimg.cc/4N1Xqpyx/Capstone-Project-1-removebg-preview.png" alt="" className='h-12 w-35 cursor-pointer'/></p>
          <Link to="/login">
          <p className=' text-xl cursor-pointer'>Login</p>
          </Link>
          <Link to="/Signup">
          <p className='cursor-pointer text-xl'>SignUp</p>
          </Link>
          <Link to="/Blog">
          <p className='cursor-pointer text-xl'>Blog</p>
          </Link>
        </nav>
        <div className='bg-green-900 text-white fixed w-full left-0 text-center h-30 top-12'>Create a spring in your life.</div>
        <div><img src="https://i.postimg.cc/K8DBCzvG/Add1.png" alt="" className='mt-30px h-400px w-full'/></div>
        <Link to="/order">
        <button className='border-yellow-400 bg-yellow-400 m-10'>Start Planting now!!</button>
        </Link>
        </div>
    )
}

export default Main