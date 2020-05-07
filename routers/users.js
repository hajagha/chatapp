const router = require('express').Router()
const User  = require('../Models/Users')

const path = require('path')
const jwt = require('jsonwebtoken')
const bycrypt = require('bcryptjs')

const authForGet = require('../authForGet')


const {addToSearchQ , makeRoom , ChangeinChatAtr} = require('../handler')


router.get('/login' , (req ,res)=>
{
    res.render('login' ,  {errormessage : ''})
})


router.get('/register' ,(req ,res)=>
{
    res.render('register' , {errormessage : ''})
})




router.post('/register' ,(req , res)=>{
    const {email ,name , password, password2} = req.body
    
    if(password != password2){
        res.render('register' , {errormessage : 'your password are not same'})

    }

    else if(password.length <6)
    {
        res.render('register' , {errormessage : 'password should at least be 6 chars'})
    }else {
        User.findOne({email : email}).then(user =>{
            if(user)
            {
                res.render('register' , {errormessage : 'user Already exist'})
            }
            else {
                const newUser = new User({
                    email ,
                    password,
                    name
                })

                bycrypt.genSalt(10 , (err , salt) =>{
                    if(err) throw err
                    bycrypt.hash(newUser.password ,salt , (err , hash)=>
                    {
                        if(err) throw err

                        newUser.password = hash

                        newUser.save().then(console.log('User saved successfully')).catch(err =>{throw err})
                        res.render('login' , {errormessage : 'User Added Susuccessfully'})
                    })
                    
                })
                

            }
        })

        

      

    }





})


router.post('/login'  , async (req ,res)=>{

    

    

    const {email ,password} = req.body
    

    await User.findOne({email : email}).then(user => {
        if(!user)
        {
            res.render('login' , {errormessage: 'No User Found With Given Email'})
        }else {
            
            bycrypt.compare(password ,user.password , (err , isMatch) =>{
                if(err) throw err
                if(isMatch){
                    const token =jwt.sign({username : user.email} , 'fuckyou' )
                    console.log(user.email , token , user.name)
                    res.status(200)
                    
                    res.render( 'dashboard' , {username : user.email , name : user.name , token : token})
                }
                else{
                    
                    res.render('login' , {errormessage: 'Wrong Password'})

                }
            } )


            
        }
    }).catch(err =>console.log(err))

})






router.get('/dashboard' , (req , res) =>{
    const username = req.headers.username
    const token = req.headers.token
    res.status(200)
    res.set({token : token})
    res.render('dashboard')
    
} )


router.post('/set' , async (req , res)=>{
    const username = req.body.username
    const targetSex = req.body.sex
    let room = 'wait'
    let roomresult ;  
    await addToSearchQ(username , targetSex)
     while(room == 'wait')
    {
       room= await makeRoom(username , targetSex)
       
    }
    
        
        res.send({room : room})
    
    
})


router.post('/setAtr' , (req ,res) => {
    const username = req.body.username
    ChangeinChatAtr(username)

})


module.exports = router