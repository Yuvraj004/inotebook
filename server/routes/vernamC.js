const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { default: VernamCipher } = require("../middleware/vernamCipher");

//ROUTE 0:Test Ciphering
router.get("/ciphering", async (req, res) => {
  try {
    const inputData = req.body;
    const cipherText = VernamCipher(inputData);
    res.json(cipherText);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error Occured");
  }
});