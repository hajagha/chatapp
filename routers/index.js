const router = require('express').Router()
const path = require('path')
const authForGet = require('../authForGet')
const authForPost = require('../authForPost')
let target = path.dirname(__dirname)

target = path.join(target , 'public')

router.get('/' , (req ,res) =>{
    res.render('welcome')
})




router.get('/message'  ,  (req , res)=>{
    res.sendfile('./public/index.html')
   
})


router.post('/chat' , authForPost   ,(req , res)=>{
    res.redirect('/chat')
   
})




router.get('/chat'   ,(req , res)=>{
    
    res.sendfile('./public/chat.html')
   
})






router.post('/message' , authForPost , (req , res)=>{
    // const username = req.headers.username
    // const token = req.headers.token
     
     res.set({
        'token': req.body.token
      })
      res.status(200)
     res.redirect('/message')
    
    
})

module.exports = router