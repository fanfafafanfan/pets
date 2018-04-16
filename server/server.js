const express = require('express')
const mongoose = require('mongoose')
//链接mongo
const DB_URL = 'mongodb://localhost:27017'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function() {
    console.log('mongo connect success')
})

//User表
const User = mongoose.model('user',new mongoose.Schema({
    user:{type:String,require:true},
    age:{type:Number,require:true}
}))
//新增数据
// User.create({
//     user:'xiaoming',
//     age:18
// },function (err,doc) {
//     if(!err){
//         console.log(doc);
//     }else{
//         console.log(err)
//     }
// })

// 删除age为18的数据
// User.remove({age:18},function (err,doc) {
//     console.log(doc)
// })

//更新zhangsan的年龄
// User.update({'user':'zhangsan'},{'$set':{age:26}},function (err,doc) {
//     console.log(doc)
// })

//新建app
const app = express()
app.get('/', function(req, res) {
    res.send('<h1>Hello world<h1>')
})

//findone 返回一条数据，没有[],可以直接用这个对象
app.get('/data', function(req, res) {
    User.find({user:'xiaoming'},function(err,doc){
        res.json(doc)
    })
    // res.json({ name: '999', type: 'IT' })
})
app.listen(9093, function() {
    console.log('Node app start at port 9093')
})