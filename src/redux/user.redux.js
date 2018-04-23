import axios from 'axios'
import { getRedirectPath } from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const initState={
    redirectTo:'',
    isAuth:false,
    msg:'', 
    user:'',
    type:''
}
//reducer
export function user(state=initState,action) {
    switch (action.type) {
        case REGISTER_SUCCESS: 
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        case LOGIN_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        case LOAD_DATA:
            return {...state,...action.payload}
        case ERROR_MSG:
            return {...state,redirectTo:'',isAuth:false,msg:action.msg}
        default:
            return state
    }
}

function registerSuccess(data) {
    console.log(data);
    return {type:REGISTER_SUCCESS, payload:data}
}
function loginSuccess(data) {
    return {type:LOGIN_SUCCESS, payload:data}
}
function errorMsg(msg) {
    return { msg, type:ERROR_MSG }
}

export function loadData(userinfo) {
    return {type:LOAD_DATA, payload:userinfo}
}
export function login({user,pwd}) {
    if (!user||!pwd) {
        return errorMsg('必须输入用户名密码')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd}).then(res=>{
            if(res.status==200&&res.data.code===0){
                dispatch(loginSuccess(res.data.data))
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
                dispatch(registerSuccess({user,pwd,type}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
    
}