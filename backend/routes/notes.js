const express=require('express');
const router = express.Router();
const app = express()
const port = 3000

router.get('/', (req, res) => {
    res.json([])
})



module.exports =router;