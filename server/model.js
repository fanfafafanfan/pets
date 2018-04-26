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