import './App.css';
import {Routes,Route} from "react-router-dom";
import Login from './Components/Login';
import Main from "./Components/Home";
import Signup from './Components/Signup';
import Blog from "./Components/Blog";
import Order from "./Components/Order"

function App() {

  return (
  <Routes>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/' element={<Main/>}></Route>
    <Route path='/Signup' element={<Signup/>}></Route>
    <Route path='/Blog' element={<Blog/>}></Route>
    <Route path='/order' element={<Order/>}></Route>
  </Routes>
  )
}

export default App
