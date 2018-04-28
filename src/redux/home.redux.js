import axios from 'axios'

const POST_LIST = 'POST_LIST'

const initState = {
    postlist:[]
}

export function home(state=initState,action) {
    switch (action.type) {
        case POST_LIST:
            return {...state,postlist:action.payload.list,users:action.payload.users}
        default:
            return state
    }
}

function postlist(list,users) {
    return {type:POST_LIST,payload:{list,users}}
}

export function getPostList(type) {
    return dispatch=>{
        axios.get('/posts/postlist')       
        .then(res=>{
            if(res.data.code==0){
                dispatch(postlist(res.data.list,res.data.users))
            }
        })
    }
}