const express = require('express');
const bcrypt =require('bcrypt')
const cookieParser = require('cookie-parser')
const connectDb = require('./config/database');
const User = require('./models/userModel');
const customerRoutes = require('./routes/customerRoutes');
const cors = require('cors');

const app= express();
app.use(cors());


app.use(express.json()); 
app.use(cookieParser())


app.use('/customer',customerRoutes) 


connectDb().then(()=>{ 
    console.log("successfully connected to Db")
    app.listen(7777, ()=>{
        console.log('server running')
    })
}).catch((error)=>{ 
    console.log('failed to connect to Db', error)
})