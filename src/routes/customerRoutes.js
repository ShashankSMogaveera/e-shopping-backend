const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel'); 
const {customerAuth} = require('../middlewares/auth'); 
const {validatePassword} = require('../utils/validations/signupValidation')
const customerRoutes= express.Router();

customerRoutes.get('/user', customerAuth, (req,res)=>{res.send('/user')});

customerRoutes.post('/login', async (req,res)=>{
    const {email:loggingEmail,password:loggingPassword} = req.body;
    console.log(loggingEmail+ "  "+ loggingPassword)

    try{
      const user = await User.findOne({email:loggingEmail});
      console.log("user  "+user)
      const comparePassword= await user.comparePassword(loggingPassword);
      if(!comparePassword){
        throw new Error("Invalid Credentials")
      }
      const jsontoken = user.getJWT();
      res.cookie('token',jsontoken).json({email:loggingEmail,password:loggingPassword, message: "login successfull"});
    }catch(error){
      console.log(error);
      res.status(400).json({message : "error:   "+error || "Something went wrong", credentials:{email:loggingEmail, password:loggingPassword}});
    }
})

customerRoutes.post("/register", async (req, res) => {
    try {
      const { name, email, userName, password } = req.body;
  
      if (!name || !email || !userName || !password) {
        return res.status(400).send("All fields are required.");
      }
      validatePassword(password);
      const passwordHash= await bcrypt.hash(password,10);
  
      const newUser = new User({ name, email, userName, password:passwordHash });
      await newUser.save();
      res.status(201).json({message:"User registered successfully!"});
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message || "User validation failed");
    }
  });


  module.exports = customerRoutes;