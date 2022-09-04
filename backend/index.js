const connectToMongo =require('./db');//importing connecttoMonog function from db.js

connectToMongo();
const express = require('express');//importing express
const app = express();
const port = 5000;//defining the port of localhost

app.use(express.json())//express. json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use('/api/notes',require('./routes/notes'));
app.get("/", (req, res) => {//request and response on the home page
  res.send("Hello World!");
});

app.listen(port, () => {//the app. listen() function is used to bind and listen the connections on the specified host and port. This method is identical to Node's http. Server.
  console.log(`Example app listening on port ${port}`);
});
