const express = require('express')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const Posts = model.getModel('posts')
const Collection = model.getModel('collection')
const Comment = model.getModel('comment')
const Images = model.getModel('images')
//帖子图片
Router.get('/postimgs',function(req,res){
    Images.find({},function (err,doc) {
            return res.json({code:0,data:doc})
    })
})
//评论列表
Router.get('/postcomment',function(req,res){
    Comment.find({},function (err,doc) {
            return res.json({code:0,data:doc})
    })
})
//发表评论
Router.post('/newcomment',function(req,res){
    const userid = req.cookies.userid
    if(!userid){
        return json.dumps({code:1})
    }
    const {postid, text} = req.body.data
    const commentmodel = new Comment({
            post_id:postid,
            comment_id:userid,
            content:text
    })
    commentmodel.save(function(err,doc){
        if (err) {
            return res.json({code:1,msg:'后端出错了'})
        }
        return res.json({code:0,data:doc})
    })
})
//更新帖子
Router.post('/updatepost',function (req,res) {
    const userid = req.cookies.userid
    const {postid,state,tags} = req.body
    const tag = tags.toString()
    state.tags = tag
    state.post_time = new Date()
    Posts.findByIdAndUpdate({_id:postid},state,function(err,doc){
        if(doc){
            const data = Object.assign(doc,state)
        }
        if (err) {
            return res.json({code:1,msg:'后端出错了'})
        }
    })
    if(state.urls){
        if(state.urls.length>0){
            Images.remove({post_id:postid},function (err,doc) {
                if (err) {
                    return res.json({code:1,msg:'后端出错了'})
                }
            })
            state.urls.forEach(v => {
                const imgmodel = new Images({
                    post_id:postid,
                    url:v
                })
                imgmodel.save(function (err,doc) {
                    if (err) {
                        return res.json({code:1,msg:'后端出错了'})
                    }
                })
            })
        }else{
            Images.remove({post_id:postid},function (err,doc) {
                if (err) {
                    return res.json({code:1,msg:'后端出错了'})
                }
            })
        }
    }
    Posts.find({author_id:userid},function (err,doc) {
        return res.json({code:0,data:doc})
    })
})
//删除帖子
Router.post('/deletepost',function (req,res) {
    const {postid} = req.body
    Posts.remove({_id:postid},function (err,doc) {
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
    })
    Images.remove({post_id:postid},function (err,doc) {
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
    })
    Comment.remove({post_id:postid},function (err,doc){
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
    })
    return res.json({code:0})
    
})
//我的帖子列表
Router.get('/mypost',function(req,res){
    const userid = req.cookies.userid
    Posts.find({author_id:userid},function (err,doc) {
            return res.json({code:0,data:doc})
    })
})
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
    const {title, content} = req.body.state
    const tags = req.body.tags
    const posttime = new Date()
    const postmodel = new Posts({
            author_id:userid,
            title:title,
            content:content,
            tags:tags,
            post_time:posttime
    })
    postmodel.save(function(err,doc){
        if (err) {
            return res.json({code:1,msg:'后端出错了'})
        }
        if (doc) {
            Posts.findOne({author_id:userid,title:title,content:content,post_time:posttime},function (err,doc) {
                if(err){
                    return res.json({code:1,msg:'后端出错了'})
                }
                if (doc) {
                    if(req.body.state.urls&&req.body.state.urls.length>0){
                        req.body.state.urls.forEach(v => {
                            
                            const imgmodel = new Images({
                                post_id:doc._id,
                                url:v
                            })
                            imgmodel.save(function (err,doc) {
                                if (err) {
                                    return res.json({code:1,msg:'后端出错了'})
                                }
                            })
                        })
                        return res.json({code:0})
                    }else{
                        return res.json({code:0})
                    }
                }
            })
        }
    })
    
})
module.exports = Router