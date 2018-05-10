import axios from 'axios'

const POST_NEW = 'POST_NEW'
const ERROR_MSG = 'ERROR_MSG'
const FAVOR_LIST = 'FAVOR_LIST'
const MY_POST = 'MY_POST'
const UPDATE_POST = 'UPDATE_POST'
const POST_COMMENT = 'POST_COMMENT'
const POST_IMAGES = 'POST_IMAGES'
const initState = {
    redirectTo:'',
    title:'',
    content:'',
    errmsg:''
}
export function post(state=initState,action) {
    switch (action.type) {
        case POST_NEW:
            return {errmsg:'',redirectTo:'/home'}
        case UPDATE_POST:
            return {mypost:action.payload,redirectTo:'/mypost'}
        case FAVOR_LIST:
            return {...state,favorlist:action.payload}
        case MY_POST:
            return {...state,mypost:action.payload}
        case POST_COMMENT:
            return {...state,commentbyid:action.payload}
        case POST_IMAGES:
            return {...state,imgsbyid:action.payload}
        case ERROR_MSG:
            return {...state,redirectTo:'',errmsg:action.errmsg}
        default:
            return state
    }
}

function errorMsg(errmsg) {
    return { errmsg, type:ERROR_MSG }
}

function imgspost({allimgs,postid}) {
    const imgsbyid =[]
    allimgs.forEach(v => {
        if(v.post_id == postid){
            imgsbyid.push(v)
        }
    });
    return {type:POST_IMAGES,payload:imgsbyid}
}
export function postimgs(postid) {
    return dispatch=>{
        axios.get('/posts/postimgs',{postid}).then(res=>{
            if (res.status==200&&res.data.code===0) {
                dispatch(imgspost({allimgs:res.data.data,postid}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

function commentpost({allcomment,postid}) {
    const commentbyid = []
    allcomment.forEach(v => {
        if(v.post_id == postid){
            commentbyid.push(v)
        }
    });
    return {type:POST_COMMENT,payload:commentbyid}
}
export function postcomment(postid) {
    return dispatch=>{
        axios.get('/posts/postcomment').then(res=>{
            if (res.status==200&&res.data.code===0) {
                dispatch(commentpost({allcomment:res.data.data,postid}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function newcomment(data) {
    return dispatch=>{
        axios.post('/posts/newcomment',{data}).then(res=>{
            if (res.status==200&&res.data.code===0) {
                // dispatch(postUpdate(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

function postUpdate(data) {
    return {type:UPDATE_POST, payload:data}
}
export function updatepost(postid,state,tags) {
    return dispatch=>{
        axios.post('/posts/updatepost',{postid,state,tags}).then(res=>{
            if (res.status==200&&res.data.code===0) {
                dispatch(postUpdate(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

function postmy(data) {
    return {type:MY_POST, payload:data}
}
export function mypost(){
    return dispatch=>{
        axios.get('/posts/mypost').then(res=>{
            if (res.status==200&&res.data.code===0) {
                dispatch(postmy(res.data.data))
            }
        })
    }
}

export function deletepost(postid) {
    return dispatch=>{
        axios.post('/posts/deletepost',{postid}).then(res=>{
            if (res.status==200&&res.data.code===0) {
                // dispatch()
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
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

function postNew() {
    return {type:POST_NEW}
}
export function newposts(state,tags) {
    return dispatch=>{
        axios.post('/posts/newpost',{state,tags}).then(res=>{
            if (res.status==200&&res.data.code===0) {
                dispatch(postNew())
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
