require('dotenv').config()

const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload())
app.use(cors())

const PORT = process.env.PORT;

const start = async () => {
    await mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4
    }).then(()=>{
        app.listen(PORT, ()=>{
            console.log(`server runned on port ${PORT}`)
        })
    })
}
start()