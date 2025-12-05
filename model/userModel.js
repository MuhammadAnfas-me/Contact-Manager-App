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
    }
})
const user = mongosh.model("user" , userSchema)
const contacts = mongosh.model("contacts",contactSchema)
module.exports = {user,contacts}