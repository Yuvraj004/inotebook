
const mongoose =require('mongoose');//importing mongoose functon from mongoose library used for editing mongodb
const mongoURI="mongodb://localhost:27017/inotebook"//connecting while creating a datbase locally

//connectto mongo function to check whether database is connected or not
const connectToMongo = async()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongo Succesfully");
    })
}

//exporting the connecttoMongo function to other js files 
module.exports= connectToMongo ;