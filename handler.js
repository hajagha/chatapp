const Search  =  require('./Models/Search')



const RoomAvalible = require('./room')

const q = require('./Q')

const Room = require('./room')


async function ChangeinChatAtr (username) {
    await Search.findOneAndUpdate({username : username} , {isInChat : true})
}


async function deletInChat()
{
  await Search.deleteMany({isInChat : true})
}



async function addToSearchQ(username ,sex) {
    Search.findOne({username : username}).then(user=> {
        if(!user)
        {
            let newUser = new Search({username : username , sex : sex ,isInChat : false})
            newUser.save()
        }
    })
}


async function makeRoom (username , sex) {
    try{
            
            let sameCrit = await Search.find({sex : sex  , isInChat : false})
            if(sameCrit.length >=2)
            {
                
                return sameCrit[0]._id
            }
            else {
                deletInChat()
                return 'wait'
            }
            
        }catch(error){
    console.log(error)
        }
    }
module.exports = {addToSearchQ , makeRoom , ChangeinChatAtr}