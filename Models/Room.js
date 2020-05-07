const mongoos = require('mongoose')


const roomSchema = new mongoos.Schema({
    user1: {
        type : String

    },
    user2: {
        type : String
   
    },
    roomid :{
        type : String 
        
    }
})

const Room = mongoos.model('Room' , roomSchema)

module.exports = Room