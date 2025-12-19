
const mongosh = require("mongoose")

const userSchema = new mongosh.Schema({
    name : {
        type : String,
        required : true 
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const contactSchema = new mongosh.Schema({
    name : {
        type : String, 
        required : true,
    },
    email : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    userId :{
        type : mongosh.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
})
const user = mongosh.model("User" , userSchema)
const contacts = mongosh.model("Contacts",contactSchema)
module.exports = {user,contacts}