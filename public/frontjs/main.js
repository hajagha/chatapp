
//// for login post method
const form = document.getElementById('form')
const button = document.getElementById('submit')
const email = document.getElementById('email')
const password = document.getElementById('password')


let token = ''
let username = ''
let name = ''





function connecttoroom (token , username){
    axios({
        method : 'get' , 
        url : '/chat',
        headers : {
            username:username,
            token : token
        }
    }).then(res =>{
        console.log('hey')
        token = res.headers.token
        username = res.headers.username

        document.documentElement.innerHTML = res.data
        const socket = io()
        const chatForm = document.getElementById('chat-form')

        const roomMaker = require('../handler')

        const chatMessage =document.querySelector('.chat-messages')


        socket.emit('joinRoom' , {username , })

        socket.on('message' , message =>{
        console.log(message)
        outPutMessage(message)


        chatMessage.scrollTop = chatMessage.scrollHeight


        })
        chatForm.addEventListener('submit' , (e)=>{
            e.preventDefault()
        
            const msg = e.target.elements.msg.value
        
        
            socket.emit('chatMessage' , msg)
        
        
            e.target.elements.msg.value=''
            e.target.elements.msg.focus()
        
        })


    }).catch()
}







function rest1 (token ,username){
    axios({
        method : 'get' , 
        url : '/message',
        headers : {
            token : token
        }
    }).then(res =>{
        console.log('req to message')
        console.log(token)
        token = res.headers.token
        document.documentElement.innerHTML = res.data
        document.getElementById('search').addEventListener('click' ,connecttoroom(token ,username))
        
    }).catch()
}





function post () {
    axios({
        method: 'post' , 
        url : '/users/login',
        data : {
            email : email.value ,
            password : password.value,
            
        }
    }).then(res =>{
        token = res.data.token,
        username = res.data.username
        name = res.data.name
        console.log(res)
        sessionStorage.setItem('username' , username)
        sessionStorage.setItem('token' , token ) 
        sessionStorage.setItem('name' , name )
        
       // window.location.href = '/users/dashboard'
        

        // if (token != '')
        // {
        //     axios({
        //         method : 'get',
        //         url : '/users/dashboard',
        //         headers : {
        //             token : token,
        //             username : username
        //         }
        //     }).then(res => {
        //         token = res.headers.token
        //         document.documentElement.innerHTML = res.data
        //         document.getElementById('submit').addEventListener('click' , rest1(token ,username))
        //     }).catch()
        // }
    }).catch((err) => console.log(err))

}





button.addEventListener('click' , post)



function outPutMessage (message) {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>`

    document.querySelector('.chat-messages').appendChild(div)
}