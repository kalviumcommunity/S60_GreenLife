import './App.css';
import {Routes,Route} from "react-router-dom";
import Login from './Components/Login';
import Main from "./Components/Home";
import Signup from './Components/Signup';
import SpecificPlant from "./Components/SpecificPlant"
import Experience from "./Components/Experience";
import Order from "./Components/Order"
import ViewGarden from './Components/ViewGarden';

function App() {

  return (
  <Routes>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/' element={<Main/>}></Route>
    <Route path='/Signup' element={<Signup/>}></Route>
    <Route path='/Experience' element={<Experience/>}></Route>
    <Route path='/order' element={<Order/>}></Route>
    <Route path='/YourGarden' element={<ViewGarden/>}></Route>
    <Route path="/plant/getplant/:id" element={<SpecificPlant/>}></Route>
  </Routes>
  )
}

export default App
