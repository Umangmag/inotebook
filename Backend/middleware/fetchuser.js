// It will just authenticate user after login that payload has not been tampered then return payload back so you will get loggedin user"s details 

// this detail will be used at several place as you get the user id who is logged in

const jwt= require('jsonwebtoken');
const JWT_SECRET= 'umangisaboy';

 const fetchuser= (req,res,next)=>{
   // Get the User from the jwt token and add id to reqq objetc
   const token= req.header('auth-token');
   if(!token)
   {
    res.status(401).send({error: "invalid token"});

   }
   try {
    const data= jwt.verify(token,JWT_SECRET);
    req.user= data.user;
    next();
   } 
   catch (error) {
    res.status(401).send({error: "invalid token"});
   }
   
  
 }
module.exports= fetchuser;