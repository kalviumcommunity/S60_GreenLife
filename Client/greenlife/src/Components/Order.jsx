import Navbar from "./Navbar";
import PlantsData from "../SampleData";

function Order(){
    return(
        <div>
            <Navbar/>
        <div className="m-10 grid grid-cols-3">
            {PlantsData.map((eachplant)=>{
                return(
                    <div key={eachplant.id} className="border-4 rounded-3xl m-10 p-10">
                    <img src={eachplant.PlantImage} alt="" className="h-50 w-70  rounded-3xl" />
                    <b>{eachplant.PlantName}</b>
                    <b>Plant Cost</b>
                    <p>{eachplant.PlantCost}</p>
                    </div>
                )
            })}
        </div>
        </div>
    )
}
export default Order;