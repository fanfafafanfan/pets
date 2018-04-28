const mongoose = require('mongoose')
    //链接mongo
const DB_URL = 'mongodb://localhost:27017/user-datas'
mongoose.connect(DB_URL)

const models = {
    user:{
        'user':{'type':String,'require':true},
        'pwd':{'type':String,'require':true},
        'type':{'type':String, 'require':true},
        //头像
        'avatar':{'type':String},
        //昵称/救助站名称
        'name':{'type':String},
        //城市
        'city':{'type':String},
        //描述
        'desc':{'type':String}
    },
    chat:{
        // 每个聊天唯一标识 from sb to sb
        'chatid':{'type':String, 'require':true},
        'from':{'type':String,'require':true},
        'to':{'type':String,'require':true},
        //针对to的用户
        'read':{'type':Boolean,'default':false},
        //聊天内容
        'content':{'type':String,'require':true,'default':''},
        //每条消息创建时间
        'create_time':{'type':Date,'default':Date.now}
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