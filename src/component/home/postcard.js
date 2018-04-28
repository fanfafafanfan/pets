import React from 'react'
import PropTypes from 'prop-types'
import {List,Brief, WhiteSpace,WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import icons from '../smallComponent/myicon/icons'

@withRouter
@icons
class PostCard extends React.Component{
    // 跳转到帖子详情的页面
    handleClick(v){
        // console.log(this.props)
        this.props.history.push(`/postdetail/${v}`)
    }
    cardavatar(id){
        const users = this.props.data.users
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
    const postlists = this.props.data.postlist
    const postcards= []
    postlists?(postlists.forEach(v => {
        v.post.map(p=>(
            // console.log(p)
            postcards.push(p)
        ))
    })):''
    

     return (
         <div id="postcard">
             <WhiteSpace/>
             {
                 (postlists)?postlists.map(v=>(
                     v.post.map(p=>(
                         <List key={p._id} 
                           
                            >
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
                     ))
                    )):null
                }
         </div>
     );
 }
}
export default PostCard