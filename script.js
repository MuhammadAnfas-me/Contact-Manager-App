const express = require("express")
const session = require("express-session")
const nocache = require("nocache")
const morgan = require("morgan")
require("dotenv").config()

const user = require("./routes/userRoute")
const connectDb = require("./DB/connectDB")
const userModel = require("./model/userModel")
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
app.use(morgan("dev"))

app.use("/",user)
connectDb();
// app.use(async (req,res,next)=>{
//     if(req.session.user){
//     req.user = await userModel.user.findById(req.session.user)
//     }
//     next()
// })

app.listen(process.env.PORT,()=>console.log(`Your server is runing on ${process.env.PORT}`))