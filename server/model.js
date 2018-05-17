const mongoose = require('mongoose')
    //链接mongo
const DB_URL = 'mongodb://localhost:27017/user-datas'
mongoose.connect(DB_URL)

const models = {
    user:{
        //账号
        'user':{'type':String,'require':true},
        //密码
        'pwd':{'type':String,'require':true},
        //身份
        'type':{'type':String, 'require':true},
        //头像
        'avatar':{'type':String},
        //用户昵称/救助站名称
        'name':{'type':String},
        //城市
        'city':{'type':String},
        //描述
        'desc':{'type':String},
    },
    chat:{
        // 每个聊天唯一标识 from sb to sb
        'chatid':{'type':String, 'require':true},
        //发送消息的用户
        'from':{'type':String,'require':true},
        //接收消息的用户
        'to':{'type':String,'require':true},
        //针对to的用户，消息是否已阅
        'read':{'type':Boolean,'default':false},
        //聊天内容
        'content':{'type':String,'require':true,'default':''},
        //每条消息创建时间
        'create_time':{'type':Date,'default':Date.now}
    },
    posts:{
        //作者编号
        'author_id':{'type':String, 'require':true},
        //帖子标题
        'title':{'type':String, 'require':true},
        //帖子内容
        'content':{'type':String, 'require':true},
        //帖子标签
        'tags':{'type':String, 'require':true},
        //发布时间
        'post_time':{'type':Date, 'require':true}
    },
    images:{
        //帖子编号
        'post_id':{'type':String, 'require':true},
        //图片url地址
        'url':{'type':String, 'require':true},
    },
    // 是否被收藏
    collection:{
        //帖子编号
        'post_id':{'type':String, 'require':true},
        //用户编号
        'user_id':{'type':String, 'require':true},
        //是否被收藏
        'collect':{'type':Boolean,'default':false}
    },
     // 评论
     comment:{
        'post_id':{'type':String, 'require':true},
        //评论人        
        'comment_id':{'type':String, 'require':true},
        'content':{'type':String, 'require':true},
        'comment_time':{'type':Date,'default':Date.now, 'require':true}
    }
}

for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function (name) {
        return mongoose.model(name)
    }
}