const express = require('express');

const app= express();

app.use('/',(_req,res)=>[
    res.send('hii')
])
app.listen(7777, ()=>{
    console.log('server running')
})