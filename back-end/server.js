const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const SOCKIO = require('socket.io')
const app = require('express')()
const http = require('http')
const schemas = require('./Schemas.js')
const server = http.createServer(app)
const io = SOCKIO(server)
let USERS = '', Competition = ''
app.use(bodyparser.urlencoded({extended:true}))
mongoose.connect('mongodb+srv://Cmate-G8:Cmate123@cluster0-t7urq.mongodb.net/test?retryWrites=true' , { useNewUrlParser: true })
.then(()=>{
    USERS = mongoose.model('USER' , schemas.User)
    Competition = mongoose.model('COMPETITION' , schemas.Competition)
})
.catch((err)=>console.log(err))
io.on('connection', socket =>{
    console.log('A CLIENT CONNECTED')
    socket.on('message', (d)=>{
        console.log(socket.id , d)
    })
})
app.get('/' , (req , res)=>{
    // console.log('REQUEST FOUND')
    // USERS.find({} , (req , d)=>{
    //     console.log(d)
    // })
    // res.end()
})
server.listen(8100 , ()=>console.log('SERVER Listning On THE PORT'))