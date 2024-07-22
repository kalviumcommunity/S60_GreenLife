import './App.css';
import {Routes,Route} from "react-router-dom";
import Login from './Components/Login';
import Main from "./Components/Home";
import Signup from './Components/Signup';
import SpecificPlant from "./Components/SpecificPlant"
import Experience from "./Components/Experience";
import Order from "./Components/Order";
import NotAuthenticated from './Components/NotAuthenticated';
// import { ContextProvider } from './Components/Context';
import ViewGarden from './Components/ViewGarden';

function App() {

  return (
    // <ContextProvider.Provider>
    <Routes>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/' element={<Main/>}></Route>
    <Route path='/Signup' element={<Signup/>}></Route>
    <Route path='/Experience' element={<Experience/>}></Route>
    <Route path='/order' element={<Order/>}></Route>
    <Route path='/YourGarden/:id' element={<ViewGarden/>}></Route>
    <Route path="/plant/getplant/:id" element={<SpecificPlant/>}></Route>
    <Route path='/NotAuthenticated' element={<NotAuthenticated/>}></Route>
  </Routes>
    // </ContextProvider.Provider>
  )
}

export default App
