import './App.css';
import {Routes,Route} from "react-router-dom";
import Login from './Components/Login';
import Main from "./Components/Home";
import Signup from './Components/Signup';
import Experience from "./Components/Experience";
import Order from "./Components/Order"

function App() {

  return (
  <Routes>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/' element={<Main/>}></Route>
    <Route path='/Signup' element={<Signup/>}></Route>
    <Route path='/Experience' element={<Experience/>}></Route>
    <Route path='/order' element={<Order/>}></Route>
  </Routes>
  )
}

export default App
