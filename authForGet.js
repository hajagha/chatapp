const jwt = require('jsonwebtoken')



module.exports = (req ,res , next) =>{
    try{
    const decoded = jwt.verify(req.headers.token , 'fuckyou')
    req.userData = decoded
    next()
    } catch(error) {
        console.log(error)
    }
    
}