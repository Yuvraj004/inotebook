const express = require('express');//importing express
const app = express();
const port = 5000;


const mongoose = require('mongoose');

mongoose.set("strictQuery", false);


const uri = 'mongodb+srv://yuvrajchat:IJUSWzRDesGiMYv2@cluster0.w6hbhbu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your connection string

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(uri);
}


var cors =require('cors')
app.use(cors())


app.use(express.json())//express. json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/vernamC", require("./routes/vernamC"));
app.get("/", (req, res) => {//request and response on the home page
    res.json("Hello World!");
    // console.log("Hello World!");
});

app.listen(port, () => {//the app. listen() function is used to bind and listen the connections on the specified host and port. This method is identical to Node's http. Server.
  console.log(`Example app listening on port ${port}`);
});
