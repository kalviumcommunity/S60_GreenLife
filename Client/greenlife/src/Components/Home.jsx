import { Link } from "react-router-dom";
import ImageCarousel from "./ImageCarousel";
import Navbar from "./Navbar"

function Main(){

  const  img=["https://i.ibb.co/HCKsCfL/Add1-1.png",
    "https://i.ibb.co/HzQkDcZ/Add-2.png",
    "https://i.ibb.co/t4JkHFs/Add3.png",
    "https://i.ibb.co/wp4BzyS/Add4.png",
    "https://i.ibb.co/dDXXvDR/Add-5-1.png",
    "https://i.ibb.co/mzMN7tF/Add6.png"
  ]
  console.log(img[0])
    return(
        <div className='mainbody'>
         <Navbar/>
         <div>
         <Link to="/order">
        <button className='border-yellow-400 bg-yellow-400 mt-20'>Start Planting now!!</button>
        </Link>
            <div className="mt-10">
             <ImageCarousel img={img}/>
             </div>
            {/* <h2>Style your houses with these beautiful flower pots</h2>
            <div className="flex mt-30">
             <div>
              <img src="https://thegreytechnologies.com/cdn/shop/products/WhatsAppImage2020-10-14at9.04.51PM_400x.jpg?v=1608310355" alt="" />
             </div>
             <div>
              <img src="https://m.media-amazon.com/images/I/71ddeqHVAQL._AC_UF894,1000_QL80_.jpg" alt=""className="h-96" />
             </div>
             <div>
              <img src="https://www.creativefabrica.com/wp-content/uploads/2021/05/18/make-these-cute-diy-place-face-pot-decals-for-plant-article-12137972-1.png" alt="" className="w-96 h-96"/>
             </div>
            </div> */}
        </div>
        </div>
    )
}

export default Main