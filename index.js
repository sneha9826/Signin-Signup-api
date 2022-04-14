const express = require('express');
const route = require('./Router/SalonRouter');
const app = express();
const dotenv = require('dotenv')
const cors = require('cors');

app.use(express.json());

app.get("/", (req, res)=>{
  res.send("Hello from index.js");
})
app.use(cors());
app.use('/', route);

app.listen(3000, (console.log("Listening Server at 3000")))