const express = require('express')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const Posts = model.getModel('posts')

// 查询所有post
Router.get('/postlist',function(req,res){
    const userid = req.cookies.userid
    User.find({},function (e,userdoc) {
        let users= {}
        userdoc.forEach(v=>{
            users[v._id] = {user:v.user,name:v.name,avatar:v.avatar}
        })
        Posts.find({},function (err,doc) {
            return res.json({code:0,list:doc,users:users})
        })
    })
})
//增加新帖
Router.post('/newpost',function(req,res){
    const userid = req.cookies.userid
    if(!userid){
        return json.dumps({code:1})
    }
    const {title, content} = req.body
    const postmodel = new Posts({
        post_id:userid,
        post:[{
            author_id:userid,
            title:title,
            content:content
        }]
    })
    postmodel.save(function(err,doc){
        if (err) {
            return res.json({code:1,msg:'后端出错了'})
        }
        return res.json({code:0,data:doc})
    })
    // Posts.update({author_id:userid},{$push:{post:{title:title,content:content}}},function(err,doc){
        
    //     if (err) {
    //         return res.json({code:1,msg:'后端出错了'})
    //     }
    //     console.log(doc);
    //     return res.json({code:0,data:doc})
    // })
})
module.exports = Router