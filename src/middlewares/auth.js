const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const customerAuth = async function(req,res,next){
    try{
        const {email}= jwt.verify(req.cookies.token, "E-Shopping@123");
        const user= await User.findOne({email:email});
        if(!user) throw new Error('Invalid Credentials')
        req.user=user;
        console.log(req.user)
        next();
    }catch(error){
        res.status(400).send({error:error});
}
} 

module.exports ={customerAuth}