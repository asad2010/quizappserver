const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./src/routers/authRouter")
const userRouter = require("./src/routers/userRouter")

dotenv.config();
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileupload({ useTempFiles: true }));

// routers
app.use("/", authRouter)
app.use("/", userRouter)

// server
const PORT = process.env.PORT || 4005;
const MONGO_URL = process.env.MONGO_URL;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => { console.log(`Server listened on port: ${PORT}`) })
  } catch (error) {
    console.error(error)
  }
}
start()