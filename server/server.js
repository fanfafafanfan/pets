const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const userRouter = require('./user')
const chatRouter = require('./chat')
const postsRouter = require('./posts')

//使用socket.io进行消息双向通信
io.on('connection',function (socket) {
    // 当前连接的socket监听当前的sendmsg  io是全局的
    socket.on('sendmsg',function (data) {
        const{ from, to, msg} = data
        const chatid = [from, to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function (err,doc) {
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
        // 使用io将data发送到全局 让每个人都能接收
        // io.emit('recvmsg',data)
    })
})

app.use(cookieParser())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use('/user',userRouter)
app.use('/chat',chatRouter)
app.use('/posts',postsRouter)

server.listen(9093, function() {
    console.log('Node app start at port 9093')
})