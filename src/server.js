import express from "express"
import dotenv from "dotenv"
import mongo from "./config/mongo.js"
dotenv.config()
const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
    res.send("hello world")
})


// Connect to MongoDB
mongo().then(() => {
    // MongoDB connected, start the server
    app.listen(port, () => {
      console.log("Server running on port:", port);
    });
  }).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });