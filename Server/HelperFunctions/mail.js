const nodemailer=require("nodemailer");
const dotenv=require("dotenv");

dotenv.config()

const tarnsportMail=nodemailer.createTransport({
    service : 'gmail',
    auth : {
       user : process.env.MAIL,
       pass : process.env.APP
    }
})

const ThankuMailBody=async(userEmail)=>{
    const Details={
        from : process.env.MAIL,
        to : userEmail.mail,
        subject : 'Thank You for your Purchase in GreenLife!',
        text : "Your order has been successfully processed. Thank you once again for choosing GreenLife.",
        html : `<p>Dear Coustmer,</p>
        <p>Your order has been successfully processed. Thank you once again for choosing GreenLife.</p>
        <p>Sincerely,<br>The GreenLife Team</p>`
    }

return await tarnsportMail.sendMail(Details,(err,res)=>{
    console.log(Details,"details")
    if(err){
        console.log("Error in sending mail from mail transporter:",err)
    }else{
        console.log("Email sent correctly:",res.response)
    }
})
}

module.exports=ThankuMailBody