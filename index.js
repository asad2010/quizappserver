const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose"); 
const dotenv = require("dotenv");

dotenv.config();
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileupload({ useTempFiles: true }));

const PORT = process.env.PORT || 4005;
const MONGO_URL = process.env.MONGO_URL;

async function start() {
  await mongoose.connect(MONGO_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
    family: 4
  });
  app.listen(PORT, () => {console.log(`Server listened on port: ${PORT}`)})
}
start()