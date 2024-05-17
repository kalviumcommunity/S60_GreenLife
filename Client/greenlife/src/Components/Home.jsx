import { Link } from "react-router-dom"
import Navbar from "./Navbar"

function Main(){
    return(
        <div className='mainbody'>
         <Navbar/>
         <div>
            <img src="https://i.postimg.cc/K8DBCzvG/Add1.png" alt=""/>
        </div>
        <Link to="/order">
        <button className='border-yellow-400 bg-yellow-400 m-10'>Start Planting now!!</button>
        </Link>
        </div>
    )
}

export default Main