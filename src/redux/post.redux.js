import axios from 'axios'

const POST_NEW = 'POST_NEW'
const ERROR_MSG = 'ERROR_MSG'
const FAVOR_LIST = 'FAVOR_LIST'
const initState = {
    redirectTo:'',
    title:'',
    content:'',
    errmsg:''
}
export function post(state=initState,action) {
    switch (action.type) {
        case POST_NEW:
            return {...state,...action.payload,errmsg:'',redirectTo:'/home'}
        case FAVOR_LIST:
            return {...state,favorlist:action.payload}
        case ERROR_MSG:
            return {...state,redirectTo:'',errmsg:action.errmsg}
        default:
            return state
    }
}

function errorMsg(errmsg) {
    return { errmsg, type:ERROR_MSG }
}

function listfavor(data) {
    return {type:FAVOR_LIST, payload:data}
}
export function favorlist(){
    return dispatch=>{
        axios.get('/posts/favorlist').then(res=>{
            if (res.status==200&&res.data.code===0) {
                dispatch(listfavor(res.data.data))
            }
        })
    }
}

export function favorpost(favor,postid) {
    return dispatch=>{
        axios.post('/posts/favor',{favor,postid}).then(res=>{
            if (res.status==200&&res.data.code===0) {
                // dispatch()
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

function postNew(data) {
    return {type:POST_NEW, payload:data}
}

export function newposts({title,content}) {
    console.log(title,content);
    if(!title||!content) {
        return errorMsg('必须输入标题和内容')
    }
    return dispatch=>{
        axios.post('/posts/newpost',{title,content}).then(res=>{
            if (res.status==200&&res.data.code===0) {
                dispatch(postNew(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
