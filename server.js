const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const flash = require('connect-flash')

const mongoose = require('mongoose')

const expressLayouts = require('express-ejs-layouts')

const db = "mongodb+srv://hajagha:9090Kosenanat@cluster0-vgsks.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(db , {useNewUrlParser: true}).then(()=>{console.log('connceted to mongodb cluster ...')})
.catch((err) =>{throw err})

app.use(expressLayouts)
app.set('view engine' , 'ejs')

const PORT = 5000 || process.env.PORT




////////////////////////////////socket mother fuckers
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
  } = require('./utils/users');


const socketio = require('socket.io')
const http = require('http')
const formatMessage = require('./utils/messages')
const server = http.createServer(app)
const botName = 'ChatCord'
const io = socketio(server)



io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
      const user = userJoin(socket.id, username, room);
  
      socket.join(user.room);
  
      // Welcome current user
      socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));
  
      // Broadcast when a user connects
      socket.broadcast
        .to(user.room)
        .emit(
          'message',
          formatMessage(botName, `${user.username} has joined the chat`)
        );
  
      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    });
  
    // Listen for chatMessage
    socket.on('chatMessage', msg => {
      const user = getCurrentUser(socket.id);
  
      io.to(user.room).emit('message', formatMessage(user.username, msg));
    });
  
    // Runs when client disconnects
    socket.on('disconnect', () => {
      const user = userLeave(socket.id);
  
      if (user) {
        io.to(user.room).emit(
          'message',
          formatMessage(botName, `${user.username} has left the chat`)
        );
  
        // Send users and room info
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room)
        });
      }
    });
  });





////////////////////////////////
app.use(bodyParser())
app.use(express.urlencoded({extended:false}))
app.use('/users' , require('./routers/users'))
app.use('/' , require('./routers/index'))



app.use(express.static(__dirname + '/public'));


server.listen(PORT , function(){
    console.log(`server is running od port : ${PORT}`)
})

