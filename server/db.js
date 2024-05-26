const mongoose =require('mongoose');//importing mongoose functon from mongoose library used for editing mongodb
const mongoURI="mongodb+srv://yuvrajchat:IJUSWzRDesGiMYv2@cluster0.w6hbhbu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//connecting while creating a datbase locally

//connectto mongo function to check whether database is connected or not
const connectToMongo = async()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongo Succesfully");
    })
}

//exporting the connecttoMongo function to other js files 
module.exports= connectToMongo ;