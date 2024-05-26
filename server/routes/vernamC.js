const express = require("express");
const router = express.Router();
require('dotenv').config();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");

//ROUTE 0:Test Ciphering
router.post("/ciphering", async (req, res) => {

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
      const notes = await Note.find({ user: req.user.id });
      res.json(notes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error Occured");
    }
});

module.exports = router;