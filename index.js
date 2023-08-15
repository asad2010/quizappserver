const express = require("express");
const fileupload = require("express-fileupload");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express()
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    // origin: "*",
    origin: "",
    // methoda: ["GET", "POST"],
  }
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(fileupload({ useTempFiles: true }));

app.get("/", (req, res) => {
  res.send("Webstar Team")
})

const PORT = process.env.PORT || 4005;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL,{
  useNewURLParser: true,
  useUnifiedTopology: true,
  family:4
}).then(() => {
  server.listen(PORT, () => console.log(`Server listened on port: ${PORT}`))
}).catch(error => console.log(error))