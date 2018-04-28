import React from 'react'
import {connect} from 'react-redux'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'

@connect(
    state=>state
)
export default class Postdetail extends React.Component {
    get_i(list) {
        const int = 0
        for(var i = 0 ;i<list.length;i++){
             if(list[i] == "" || typeof(list[i]) == "undefined")
             {
                list.splice(i,1)
                      i= i-1
             }
        }
        return list
    }
    render() {
        console.log(this.props);
        const postid = this.props.match.params.postid
        const postDetail = this.props.home.postlist.map(
            v=>v.post.filter(
                i=>i._id==postid
            ))
        console.log(postDetail);
        const list = this.get_i(postDetail)
        const postdetail = postDetail[0][0]
        console.log(list);
        return (
            <div id="postdetail">
                <NavBar 
                mode='dark'
                icon={<Icon type="left" />}
                onLeftClick={() => {this.props.history.goBack()}}
                >
                    帖子详情
                </NavBar>
                <h3>{postdetail.title}</h3>
            </div>
        )
    }
}
