const express=require("express");
const {CartModel}=require("../mongoConnect")

const CartRouter=express.Router()

async function FetchCart(request,response,next){
let yourCart;
try{
    yourCart=await CartModel.findOne({UserId : request.params.UserId}).populate('plants.id')
    if(yourCart==null){
        return response.status(404).json({note : "Cannot find user and cart"})
    }
}catch(error){
    return response.status(500).json({note : error.message})
}
response.yourCart=yourCart;
next()
}

CartRouter.get('/get/:UserId',FetchCart,(request,response)=>{
    response.json(response.yourCart)
})

CartRouter.post('/post/:UserId',async(request,response)=>{
    const plantsArray=request.body.plants;
    // console.log(request.body,"here is your request")
if(!Array.isArray(plantsArray)){
    return response.status(400).json({note : "Please include plants array"})
}
    try{
        let plantcart=await CartModel.findOne({UserId : request.params.UserId})

        if(!plantcart){
plantcart=new CartModel({
    UserId : request.params.UserId,
    plants : plantsArray
})
}else{
plantsArray.forEach(({id,quantity}) => {
    const plantIndex=plantcart.plants.findIndex(i=>i.id.toString()==id)
    if(plantIndex>-1){
        plantcart.plants[plantIndex].quantity+=quantity;
    }else{
        plantcart.plants.push({id,quantity})
    }
    
});
        }
        const CartList=await plantcart.save();
            response.status(201).json(CartList)
    }catch(error){
        response.status(400).json({note : error.message})
    }
}
)

CartRouter.delete('/delete/:Userid/:plantid',async(request,response)=>{
    const{Userid,plantid}=request.params;
    try{
        const findcart=await CartModel.findOne({ UserId : Userid })
        if(!findcart){
            return response.status(404).json({note : "There is no user with provided cart."})
        }
        const selectplant=findcart.plants.findIndex(p=>p.id.toString()==plantid);
        console.log(findcart,"selected plant")
        if(selectplant>-1){
            findcart.plants.splice(selectplant,1)
            const updatedcart= await findcart.save()
            return response.status(200).json(updatedcart)
        }else{
          return response.status(404).json({note : "plant not found in cart"})
        }
    }catch(err){
        return response.status(500).json({note : err.message})
    }

})

module.exports=CartRouter;
