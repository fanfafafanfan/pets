import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {List,Brief, WhiteSpace,WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import icons from '../smallComponent/myicon/icons'
@withRouter
@icons
class PostCard extends React.Component{
    // 跳转到帖子详情的页面
    handleClick(id){
        // console.log(this.props)
        this.props.history.push(`/postdetail/${id}`)
    }
    cardavatar(id){
        const users = this.props.users
        return {avatar:users[id].avatar,name:users[id].name}
    }
    getCardContent(str){
        if(str.length>45){
            str=str.substring(0,45)+"...";
        }
        return str
    }
 render() {
    const Item = List.Item
    const Brief = Item.Brief
    const postlists = this.props.data
    const showDelete = this.props.showDelete
    console.log(this.props);
     return (
         <div id="postcard" style={{marginTop:'3rem'}}>
             {
                 (postlists)?postlists.map(p=>(
                         <List key={p._id}>
                                <Item
                                platform="android"
                                wrap
                                onClick={()=>this.handleClick(p._id)}
                                >
                                    {p.title}
                                    <Brief>{
                                        <div>
                                        {this.props.icons(this.cardavatar(p.author_id).avatar)}
                                        <span>{this.cardavatar(p.author_id).name}</span>
                                        <span>{p.post_time}</span>
                                        </div>
                                        }</Brief>  
                                </Item>
                            </List> 
                    )):null
                }
            <WhiteSpace/>                
         </div>
     );
 }
}
export default PostCard