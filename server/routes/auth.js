const express=require('express');
const router = express.Router();

const User=require('../models/User')

const { body, validationResult } = require('express-validator');

var bcrypt = require('bcryptjs');

var jwt =require('jsonwebtoken');

var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET="yuvi";

function VernamCipher(data) {
  const KEY = process.env.KEY;
  // console.log(KEY)
  if (!KEY) throw new Error("Environment variable KEY is not set.");

  // Extend the key to match the length of the data
  let extendedKey = KEY;
  while (extendedKey.length < data.length) {
    extendedKey += KEY;
  }
  extendedKey = extendedKey.slice(0, data.length);

  let outputString = "";
  for (let index = 0; index < data.length; index++) {
    const dataCharCode = data.charCodeAt(index);
    const keyCharCode = extendedKey.charCodeAt(index);
    
    // Vernam cipher XOR operation
    const outCharCode = dataCharCode ^ keyCharCode;
    // console.log(String.fromCharCode(outCharCode+65));
    // Convert the resulting character code back to a character
    outputString += String.fromCharCode(outCharCode+65);
  }
  return outputString;
}


//ROUTE-1 create a User using : POST "/api/auth/createuser". 

router.post('/createuser',[
  body('email','Enter a valid Email').isEmail(),//custom msg can also be done
  body('name',"Enter a valid name").isLength({ min: 3 }),
  body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  //if there are errors,returning bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the use with this email exists already
    try{
      let user = await User.findOne({email:req.body.email});
      if (user){
        return res.status(400).json({error:"Sorry a user with this email already exists"})
      }
      //generating more secure password by salting the password
      const salt= await bcrypt.genSalt(10);
      const cipheredName = VernamCipher(req.body.name);
      const secPass= await bcrypt.hash(req.body.password,salt);
      user=await User.create({
          name: cipheredName,
          email: req.body.email,
          password:secPass,}
        );
        // .then(user => res.json(user))
        // .catch(err=>
        //   console.log(err),
        // res.json({error:'Plz enter a unique value for Email',message: err.message}))
      const data ={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data,JWT_SECRET);
      res.json({authtoken})
    }
    //to catch some unknown error
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal server error Occured"); 
    }
})


//ROUTE-2 : Authenicating a user
router.post('/login',[
  body('email','Enter a valid Email').isEmail(),//custom msg can also be done
  body('password','Password cannot be blank').exists(),
], async (req, res) => {
  let success=false;
  //if there are errors,returning bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password}=req.body;
  try{
    let user=await User.findOne({email});
    if(!user){
      return res.status(400).json({success,error:"Please use correct credentials"})
    }

    const passCompare= await bcrypt.compare(password,user.password);
    if(!passCompare){
      return res.status(400).json({success,error:"Please use correct credentials"})
    }

    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true
      res.json({success,authtoken})
    
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error Occured"); 
  }
})


//ROUTE-3: Get loggedin user details using: POST "api/auth/getuser".Login required
router.post('/getuser',fetchuser,async (req, res) => {
  try {
    const userId=req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error Occured");
  }
})

//exporting router method
module.exports =router;