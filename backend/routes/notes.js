const express=require('express');
const router = express.Router();
var fetchuser =require('../middleware/fetchuser');
const Note =require("../models/Note");
const { body, validationResult } = require('express-validator');

//ROUTE 1:GET all the notes
router.get('/fetchallnotes',fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error Occured"); 
    }
   
})

//ROUTE 2:Create the notes,POST:"api/notes/addnote".login required
router.get('/addnote',fetchuser,[
    body('title','Enter a valid Title').isLength({min:3}),//custom msg can also be done
    body('description',"Must be atleast five characters").isLength({ min: 5 }),
], async (req, res) => {
    try{
        const {title,description,tag}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title,description,tag,user:req.user.id,Date
        })
        const savedNote= await note.save()
        res.json(savedNote)
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error Occured"); 
    }
    
})



module.exports =router;