const mongoose= require('mongoose');

const connectDb= async ()=>{
    await mongoose.connect('mongodb+srv://shashanksmogaveera12:Qde2VvBYIj4Sbsrc@e-shopping.gs8a2.mongodb.net/e-shopping');
}

module.exports = connectDb;