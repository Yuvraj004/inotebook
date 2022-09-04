const express=require('express');
const router = express.Router();
var fetchuser =require('../middleware/fetchuser');
const Notes =require("../models/Notes");
const { body, validationResult } = require('express-validator');

//ROUTE 1:GET all the notes
router.get('/fetchallnotes', async (req, res) => {
    const notes = await Notes.find({user:req.user.id});
    res.json(notes)
})

//ROUTE 2:Create the notes,POST:"api/notes/addnote".login required
router.get('/addnote', async (req, res) => {
    const notes = await Notes.find({user:req.user.id});
    res.json(notes)
})



module.exports =router;