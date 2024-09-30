import { useState,useEffect} from "react";


function ImageCarousel(img){

        const[id,setid]=useState(0);

        useEffect(()=>{
            if (img.img.length===0) return;
            const time=setInterval(()=>{
                setid((prev)=>(prev+1)%img.img.length)
            },3000);
            return ()=>clearInterval(time)
        },[img.img.length,id])

        console.log(img[id],"imgsrc")
    return(
        <div className="w-full h-screen mt-10">
            <div className="w-full h-3/4">
                <img src={img.img[id]} alt="addvertisement"  className="w-full h-full object-cover"/>
            </div>
        </div>
    )
}
export default ImageCarousel;