const express = require("express");
const router = express.Router();
require('dotenv').config();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");

const { MongoClient } = require("mongodb");

const mongoURI="mongodb+srv://yuvrajchat:IJUSWzRDesGiMYv2@cluster0.w6hbhbu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(mongoURI);

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

//ROUTE 0:Test Ciphering
router.post("/ciphering", async (req, res) => {

    

    // Example usage
    // const data = "HELLO";
    // const encrypted = VernamCipher(data);
    // console.log("Encrypted:", encrypted);
    // console.log('reached');

    try {
        const inputData = req.body.data;
        const cipherText = VernamCipher(inputData);
        // console.log(cipherText);
        res.json(cipherText);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error Occured");
    }
});

//ROUTE 1:GET all the notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
      console.log(req.user.id);
      const dbNotes = User.find({ user: req.user.id });
      console.log(dbNotes);
      res.json(dbNotes).status(201);
      // client.db('test').collection('user', async function (err,collection){
      //   if( err ) throw err;
        
      //   await collection.find({ user: req.user.id },function(err,notes){
      //     res.json(notes);
      //     if(err) throw err;
      //   });
      // })
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error Occured");
    }
});

//ROUTE 2:Create the notes,GET:"api/notes/addnote".login required
router.post("/addnote",fetchuser,async (req, res) => {
      try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
        const note = new Note({
          title,
          description,
          tag,
          user: req.user.id,
        });
        client.db('test').collection('notes', async function(err, collection){
          if( err ) throw err;
          await collection.insertOne(note,function(err,savedNote){
            if( err ) throw err;
            res.json(savedNote);
          });          
        })

      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error Occured");
      }
    }
  );
  
  //ROUTE 3 Update the notes already associated with a user POST "api/notes/updatenote". login required
  router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
  
    //find the node to be updated
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  });
  
  //ROUTE 4 Delete notes
  router.delete("/deletenote/:id", fetchuser, async (req, res) => {
      try {
          // Find the note to be delete and delete it
          let note = await Note.findById(req.params.id);
          if (!note) { return res.status(404).send("Not Found") }
  
          // Allow deletion only if user owns this Note
          if (note.user.toString() !== req.user.id) {
              return res.status(401).send("Not Allowed");
          }
  
          note = await Note.findByIdAndDelete(req.params.id)
          res.json({ "Success": "Note has been deleted", note: note });
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })
  

module.exports = router;