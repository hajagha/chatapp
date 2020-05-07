const mongoos = require('mongoose')


const searchSchema = new mongoos.Schema({
    username: {
        type : String,
        require: true
    },
    sex : {
        type : String , 
        required : true
    }, 
    isInChat : {
        type : Boolean , 
        required : true
    }
   
})

const Search = mongoos.model('Search' , searchSchema)

module.exports = Search