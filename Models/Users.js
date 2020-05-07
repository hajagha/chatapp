const mongoos = require('mongoose')


const UserSchema = new mongoos.Schema({
    email: {
        type : String,
        require: true
    },
    password : {
        type: String,
        required: true
    },
    name :{
        type : String,
        required : true
    },
    date : {
        type: Date,
        default : Date.now
    }
})

const User = mongoos.model('User' , UserSchema)

module.exports = User