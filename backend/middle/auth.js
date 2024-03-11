const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Task'

const auth = (req,res,next)=>{

    try{

        let token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            jwt.verify(token,SECRET_KEY,(err,user)=>{
                if(err){
                if(err.name === 'TokenExpiredError'){
                    return res.status(401).json({ message: 'Token expired' });
                }else{
                    res.status(401).json({ message: "Invalid user" })
                }
            }
            req.userId = user.id;
            }); 
           
        }   
        
        next();


    }catch(err){
        res.status(401).json({ message: "unauthorized user" })

    }
}

module.exports = auth; 