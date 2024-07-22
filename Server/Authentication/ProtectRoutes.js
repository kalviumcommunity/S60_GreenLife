const jwt=require("jsonwebtoken")

function Authentication(request,response,next){
    // console.log("request headers",request.headers)
const Safetoken=request.header('x-auth-token');
// console.log("SafeToken",Safetoken)
if(!Safetoken){
    // console.log("There is no token")
    return response.status(401).json({note : 'Not authorized'})
}
try{
    const decodeToken=jwt.verify(Safetoken,process.env.Secret_key);
    request.user=decodeToken.user;
    next()
}catch(err){
    response.status(401).json({note : "Token is not valid"})
}
}

module.exports=Authentication;