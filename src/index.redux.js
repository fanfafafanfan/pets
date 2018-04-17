
const ADD_GUN = "加机关枪"
const REMOVE_GUN = "减机关枪"
//reducer
export function counter(state=0,action) {
    switch(action.type){
        case ADD_GUN:
        return state+1
        case REMOVE_GUN:
        return state-1
        default:
        return 10
    }
}
// action creator
export function addGUN() {
    return {type:ADD_GUN}
}
export function removeGUN() {
    return {type:REMOVE_GUN}
}
export function addGunAsync() {
    return dispatch=>{
    setTimeout(() => {
        dispatch(addGUN())
    }, 2000);
    }
}

// import {createStore} from 'redux'
// //1.新建store
// //通过reducer来建立
// //通过老的state状态和action 生成新的state
// function counter(state=0,action) {
//     switch(action.type){
//         case '加机关枪':
//         return state+1
//         case '减机关枪':
//         return state-1
//         default:
//         return 10
//     }
// }
// //1.新建store
// const store = createStore(counter)
// const init = store.getState()
// console.log(init)
// function listener() {
//     const current = store.getState()
//     console.log(`我现在有机枪${current}把`)
// }
// store.subscribe(listener)

// //派发事件 传递action
// store.dispatch({type:'加机关枪'})
// store.dispatch({type:'加机关枪'})
// store.dispatch({type:'加机关枪'})
