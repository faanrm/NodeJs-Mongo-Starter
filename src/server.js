import express from "express"
import dotenv from "dotenv"
import mongo from "./config/mongo.js"
import  userRoutes from "./routes/UserRoutes.js"
import bodyParser from "body-parser"
dotenv.config()
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.get('/', (req, res) => {
    res.send("hello world")
})

app.use('/api',userRoutes)

// Connect to MongoDB
mongo().then(() => {
    // MongoDB connected, start the server
    app.listen(port, () => {
      console.log(`Server is running and listening on http://localhost:${port}`);
    });
  }).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });