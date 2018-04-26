import axios from 'axios'
import { getRedirectPath } from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const NEW_POST = 'NEW_POST'
const LOG_OUT = 'LOG_OUT'
const initState={
    redirectTo:'',
    msg:'', 
    user:'',
    type:''
}
//reducer
export function user(state=initState,action) {
    switch (action.type) {
        case AUTH_SUCCESS: 
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
        case LOAD_DATA:
            return {...state,...action.payload}
        case ERROR_MSG:
            return {...state,redirectTo:'',isAuth:false,msg:action.msg}
        case LOG_OUT:
            return {...initState,redirectTo:'/login'}
        case NEW_POST:
            return {...state,redirectTo:'/newpost'}
        default:
            return state
    }
}

function authSuccess(data) {
    return {type:AUTH_SUCCESS, payload:data}
}
function errorMsg(msg) {
    return { msg, type:ERROR_MSG }
}

export function logoutSubmit() {
    return {type:LOG_OUT}
}

export function newpost() {
    return {type:NEW_POST}
}

export function loadData(userinfo) {
    return {type:LOAD_DATA, payload:userinfo}
}
export function update(data){
    return dispatch=>{
        axios.post('/user/update',data).then(res=>{
            if(res.status==200&&res.data.code===0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function login({user,pwd}) {
    if (!user||!pwd) {
        return errorMsg('必须输入用户名密码')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd}).then(res=>{
            if(res.status==200&&res.data.code===0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function register({user,pwd,repeatpwd,type}) {
    if (!user||!pwd||!type) {
        return errorMsg('必须输入用户名密码')
    }
    if (pwd!==repeatpwd) {
        return errorMsg('两次输入的密码不一致')
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type}).then(res=>{
            if(res.status==200&&res.data.code===0){
                dispatch(authSuccess({user,pwd,type}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
    
}