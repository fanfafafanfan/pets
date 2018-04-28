import axios from 'axios'

const POST_NEW = 'POST_NEW'
const ERROR_MSG = 'ERROR_MSG'
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
        case ERROR_MSG:
            return {...state,redirectTo:'',errmsg:action.errmsg}
        default:
            return state
    }
}

function errorMsg(errmsg) {
    return { errmsg, type:ERROR_MSG }
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
            console.log(res);
            if (res.status==200&&res.data.code===0) {
                dispatch(postNew(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
