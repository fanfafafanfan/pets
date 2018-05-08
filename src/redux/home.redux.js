import axios from 'axios'

const POST_LIST = 'POST_LIST'
const ALL_IMAGES = 'ALL_IMAGES'

const initState = {
    postlist:[]
}

export function home(state=initState,action) {
    switch (action.type) {
        case POST_LIST:
            return {...state,postlist:action.payload.list,users:action.payload.users}
        case ALL_IMAGES:
            return {...state,allimages:action.payload}
        default:
            return state
    }
}
function imgsall(data) {
    return {type:ALL_IMAGES,payload:data}
}
export function allpostimgs() {
    return dispatch=>{
        axios.get('/posts/postimgs',{}).then(res=>{
            if (res.status==200&&res.data.code===0) {
                dispatch(imgsall(res.data.data))
            }
        })
    }
}
function postlist(list,users) {
    return {type:POST_LIST,payload:{list,users}}
}

export function getPostList() {
    return dispatch=>{
        axios.get('/posts/postlist')       
        .then(res=>{
            if(res.data.code==0){
                dispatch(postlist(res.data.list,res.data.users))
            }
        })
    }
}
