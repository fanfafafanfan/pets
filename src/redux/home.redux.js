import axios from 'axios'

const POST_LIST = 'POST_LIST'

const initState = {
    postlist:[]
}

export function home(state=initState,action) {
    switch (action.type) {
        case POST_LIST:
            return {...state,postlist:action.payload}
        default:
            return state
    }
}

function postlist(data) {
    return {type:POST_LIST,payload:data}
}

export function getPostList(type) {
    return dispatch=>{
        // axios.get('/user/list/?type=lingyang')
        axios.get('/user/list')        
        .then(res=>{
            if(res.data.code==0){
                dispatch(postlist(res.data.data))
            }
        })
    }
}