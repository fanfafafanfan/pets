const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const Posts = model.getModel('posts')
const _filter = {'pwd':0,'__v':0}

// 查询所有user信息
Router.get('/list',function(req,res){
    // User.remove({},function(e,d){})
    // const {type} = req.query
    User.find({},function (err,doc) {
        return res.json({code:0,data:doc})
    })
})

//完善信息页面
Router.post('/update',function(req,res){
    const userid = req.cookies.userid
    if(!userid){
        return json.dumps({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function (err,doc) {
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,data})
    })
})

//登录页面信息
Router.post('/login', function(req, res){
    const {user, pwd} = req.body
    User.findOne({user,pwd:md5Pwd(pwd)}, function (err,doc) {
        if(!doc){
            return res.json({code:1,msg:'用户名或密码错误'})
        }else{
            res.cookie('userid',doc._id)
            return res.json({code:0,data:doc})
        }
        
    })
})

// 注册页面信息
Router.post('/register', function(req, res){
    const {user, pwd, type} = req.body
    User.findOne({user:user}, _filter,function (err,doc) {
        if(doc) {
            return res.json({code:1,msg:'用户名重复'})
        }else{
            const userModel = new User({user,type,pwd:md5Pwd(pwd)})
		    userModel.save(function(e,d){
                if (e) {
                    return res.json({code:1,msg:'后端出错了'})
                }
                const {user, type, _id} = d
                res.cookie('userid', _id)
                return res.json({code:0,data:{user, type, _id}})
            })
        }
        
    })
})

// 如果cookie中没有userid 即用户未登录 直接跳转到用户登录页面
Router.get('/info',function (req,res) {
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid}, _filter, function (err,doc) {
        if(err){
            return res.json({code:1, msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0, data:doc})
        }
    })
})

function md5Pwd(pwd) {
    const salt = 'pets_is_Love_5613s64s11we!@#OSKN~~'
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router