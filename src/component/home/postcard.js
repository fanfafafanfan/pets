import React from 'react'
import {List, WhiteSpace,Tag} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import icons from '../smallComponent/myicon/icons'
@withRouter
@icons
class PostCard extends React.Component{
    // 跳转到帖子详情的页面
    handleClick(id){
        console.log(this.props)
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
    findfirstimg(postid){
        const imgs = this.props.imgs
        const img =[]
        if(imgs){
            imgs.forEach(v => {
                if(v.post_id==postid){
                    img.push(v.url)
                }
            });
        }
        return img
    }
 render() {
    const Item = List.Item
    const Brief = Item.Brief
    const postlists = Object.values(this.props.data).sort((a,b)=>{
        return Date.parse(b.post_time) - Date.parse(a.post_time)
    })
     return (
         <div id="postcard">
             {
                 (postlists)?postlists.map(p=>(
                         <List key={p._id}>
                                <Item
                                platform="android"
                                wrap
                                onClick={()=>this.handleClick(p._id)}
                                extra={
                                    this.findfirstimg(p._id)&&this.findfirstimg(p._id).length>0?
                                    <img src={this.findfirstimg(p._id)[0]}  alt="无法显示"/>:''
                                    }
                                >
                                    {p.title}
                                    <Brief>
                                    {
                                        <div>
                                            {this.props.icons(this.cardavatar(p.author_id).avatar)}
                                            <span>{this.cardavatar(p.author_id).name}</span>
                                            <div style={{marginLeft:'25px'}}>
                                                {p.tags.split(',').map(v=>(
                                                    <Tag key={v} style={{marginRight:'5px'}} selected>{v}</Tag>
                                                ))}
                                            </div>
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