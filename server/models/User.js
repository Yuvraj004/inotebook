const mongoose=require('mongoose');
const {Schema}=mongoose;

//creating a data structure for creating a new user
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
//creating a model for auth of user
const User = mongoose.model('user',userSchema,'user');
//createindexes to uniquely identify each email,repetitve email will not saved separately
User.createIndexes();
//exporting the model
module.exports = User