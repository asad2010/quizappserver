const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRouter = require("./src/routers/authRouter")
const userRouter = require("./src/routers/userRouter")
const categoryRouter = require("./src/routers/categoryRouter")
const groupRouter = require("./src/routers/groupRouter")
const examRouter = require("./src/routers/examRouter")
const questionRouter = require("./src/routers/questionRouter")

dotenv.config();
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileupload({ useTempFiles: true }));

// employee
app.get("/", (req,res)=>{
  res.send("Hello! This is \"quiz app\" backend by 1-group!")
})

// routers
app.use("/", authRouter)
app.use("/", userRouter)
app.use("/admin/", categoryRouter)
app.use("/admin/groups", groupRouter)
app.use("/", examRouter)
app.use("/admin/questions", questionRouter)

// server
const PORT = process.env.PORT || 4005;
const MONGO_URL = process.env.MONGO_URL;

async function start() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => { console.log(`Server listened on port: ${PORT}`) })
  } catch (error) {
    console.error(error)
  }
}
start()