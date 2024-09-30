const nodemailer=require("nodemailer");
const dotenv=require("dotenv");

dotenv.config()

const tarnsportMail=nodemailer.createTransport({
    host : process.env.HOST,
    port : process.env.PORT,
    secure : false,
    service : 'hotmail',
    auth : {
       type: "OAuth2",
       user : process.env.MAIL,
       pass : process.env.APP
    },
    tls : {
        ciphers : process.env.TLS
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
        console.log("Error in sending mail from mail transporter:",err.message)
    }else{
        console.log("Email sent correctly:",res.response)
    }
})
}

module.exports=ThankuMailBody