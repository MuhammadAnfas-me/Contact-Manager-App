const express = require("express")
const session = require("express-session")
const user = require("./routes/userRoute")
const connectDb = require("./DB/connectDB")
const nocache = require("nocache")
require("dotenv").config()
let app = express()

app.set("view engine" , "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret : "anything",
    resave : false,
    saveUninitialized : true,
    cookie:{
        maxAge : 1000*60*60*24
    }
}))
app.use(nocache())
app.use("/",user)
connectDb();

app.listen(process.env.PORT,()=>console.log("Your server is runing on 7000"))