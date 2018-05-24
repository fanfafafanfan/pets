const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')

//获取消息列表
Router.get('/getmsglist',function (req,res) {
    const userid = req.cookies.userid
    User.find({},function (e,userdoc) {
        let users= {}
        userdoc.forEach(v=>{
            users[v._id] = {user:v.user,name:v.name,avatar:v.avatar}
        })
        Chat.find({'$or':[{from:userid},{to:userid}]},function (err,doc) {
            if(!err){
                return res.json({code:0,msgs:doc,users:users})
            }  
        })
    })
    // {'$or':[{from:user,to:user}]}
    
})
//修改已读消息数量
Router.post('/readmsg',function (req,res) {
    const userid = req.cookies.userid
    const {from} = req.body
    Chat.update(
        {from,to:userid},
        {'$set':{read:true}},
        {'multi':true},
        function (err,doc) {
        if (!err) {
            return res.json({code:0,num:doc.nModified})
        }
        return res.json({code:1,msg:'修改未读消息数量失败'})
    })
})

module.exports = Router