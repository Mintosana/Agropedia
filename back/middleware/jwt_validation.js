const jwt = require('jsonwebtoken');

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwtToken;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET, (err,decodedToken)=>{
            if(err){
                //redirect on login page gen
            }
            else{
                next();
            }
        });
    }
    else{
        //redirect on login page gen
    }
}

module.exports = requireAuth;