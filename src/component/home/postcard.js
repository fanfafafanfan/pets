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
    timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth()+1 < 10 ? (date.getMonth()+1) : date.getMonth()+1) + '-';
        const D = date.getDate() + ' '
        const h = date.getHours() + ':'
        const m = date.getMinutes() + ':'
        const s = date.getSeconds();
        return Y+M+D+h+m+s;
    }
 render() {
    const Item = List.Item
    const Brief = Item.Brief
    const users = this.props.users
    const showDelete = this.props.showDelete
    const postlists = Object.values(this.props.data).sort((a,b)=>{
        return Date.parse(b.post_time) - Date.parse(a.post_time)
    })
    const imgs = this.props.imgs
     return (
         <div id="postcard">
             {
                 (postlists)?postlists.map(p=>(
                         <List key={p._id}>
                                <Item
                                platform="android"
                                wrap
                                onClick={()=>this.handleClick(p._id)}
                                extra={<img src={imgs}  alt="无法显示"/>}
                                >
                                    {p.title}
                                    <Brief>
                                    {
                                        <div>
                                            {this.props.icons(this.cardavatar(p.author_id).avatar)}
                                            <span>{this.cardavatar(p.author_id).name}</span>
                                        </div>
                                    }
                                    </Brief>  
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