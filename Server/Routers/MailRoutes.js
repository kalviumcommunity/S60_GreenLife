const express=require("express");
const MailRouter=express.Router();
const ThankuMail=require("../HelperFunctions/mail");

MailRouter.post("/send-mail",async(req,res)=>{
    const mail=req.body;
    if(!mail){
        return res.status(400).send("mail not found");
    }else{
        try{
            await ThankuMail(mail)
            console.log("mai",mail)
           res.status(200).send("thank u mail sent correctly")
        }catch(err){
            console.log("Cannot send email from backend",err)
            res.status(500).send("Error in sending mail from backend")
        }
    }
})

module.exports=MailRouter;