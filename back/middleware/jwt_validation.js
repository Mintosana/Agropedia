const jwt = require('jsonwebtoken');

const middlewareController = {
    requireAuth : (req,res,next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(' ')[0];
        // const tokenDecodat = jwt.decode(token, {complete:true});
        if(token){
            jwt.verify(token,process.env.JWT_SECRET, (err,decodedToken)=>{
                if(err){
                    res.status(401).send({message: "Nu ai access, trebuie sa te loghezi (token gresit)", status:401});
                }
                else{
                    next();
                }
            });
        }
        else{
            res.status(401).send({message: "Nu ai access, trebuie sa te loghezi (nu ai token)",status:401});
        }
    },
}



module.exports = middlewareController;