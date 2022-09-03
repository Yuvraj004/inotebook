//js for authentication of user
const express=require('express');
const router = express.Router();
//importing Router function in express
const User=require('../models/User')
//for including the data format of user information
//importing express-validator
const { body, validationResult } = require('express-validator');

//create a User using : POST "/api/auth/". Doesn't require auth
//router. post() refers to POST requests and router. get() referes to GET request. The difference between the two is that a GET request, is requesting data from a specified source and a POST request submits data to a specified resource to be processed.
router.post('/',[
    body('email','Enter a valid Email').isEmail(),//custom msg can also be done
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password:req.body.password,
      }).then(user => res.json(user))
      .catch(err=>
        console.log(err),
        res.json({error:'Plz enter a unique value for Email',message: err.message}))
})


//exporting router method
module.exports =router;