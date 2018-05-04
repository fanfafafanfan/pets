const express = require('express')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const Posts = model.getModel('posts')
const Collection = model.getModel('collection')
const Comment = model.getModel('comment')

//收藏列表
Router.get('/favorlist',function(req,res){
    Collection.find({},function (err,doc) {
            return res.json({code:0,data:doc})
    })
})
//添加喜欢
Router.post('/favor',function(req,res){
    const userid = req.cookies.userid
    if(!userid){
        return json.dumps({code:1})
    }
    const {favor,postid} = req.body
    Collection.findOne({post_id:postid,user_id:userid},function (err,doc) {
            if(doc){
                Collection.update({_id:doc._id},
                    {$set:{collect:(favor=='favorfill'?true:false)}},
                function(err,doc){
                    if (err) {
                        return res.json({code:1,msg:'后端出错了'})
                    }
                    return res.json({code:0,data:doc})
                })
            }
            else{
                const collectionModel = new Collection({
                    post_id:postid,
                    user_id:userid,
                    collect:(favor=='favorfill'?true:false)
                })
                collectionModel.save(function (err,doc) {
                    if (err) {
                        return res.json({code:1,msg:'后端出错了'})
                    }
                    return res.json({code:0,data:doc})
                })
            }
        }
    )
    
})
// 查询所有post
Router.get('/postlist',function(req,res){
    const userid = req.cookies.userid
    User.find({},function (e,userdoc) {
        let users= {}
        userdoc.forEach(v=>{
            users[v._id] = {user:v.user,type:v.type,name:v.name,avatar:v.avatar,city:v.city}
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
            author_id:userid,
            title:title,
            content:content
    })
    postmodel.save(function(err,doc){
        if (err) {
            return res.json({code:1,msg:'后端出错了'})
        }
        return res.json({code:0,data:doc})
    })
})
module.exports = Router