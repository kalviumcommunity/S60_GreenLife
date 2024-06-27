import { Link } from "react-router-dom"

function NotAuthenticated(){
    return(
        <div>
            Sign up or log in to access the exclusive content on our website! Join our community to stay updated and enjoy the features.
            <br></br>
            <Link to="/login">
            <button className="mt-5 bg-red-500 text-white">Login</button>
            </Link>
        </div>
    )

}
export default NotAuthenticated