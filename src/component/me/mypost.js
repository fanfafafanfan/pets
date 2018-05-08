import React from 'react'
import {NavBar, Icon, List, Brief, WhiteSpace, Button, Modal} from 'antd-mobile'
import { connect } from 'react-redux'
import icons from '../smallComponent/myicon/icons'
import PostCard from '../home/postcard'
import './me.css'
import {deletepost,mypost,favorlist} from '../../redux/post.redux'
const alert = Modal.alert

@connect(
    state=>state,
    {deletepost,mypost,favorlist}
)
@icons
export default class Mypost extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            showDelete:false
        }
    }
    componentDidMount() {
        this.props.mypost()
        this.props.favorlist()
    }
    handleClick(id){
        // console.log(this.props)
        this.props.history.push(`/postdetail/${id}`)
    }
    handleDelete(id){
        alert('删除', '你确定删除吗?', [
            { text: '取消' },
            { text: '确定', onPress: () =>  new Promise((resolve) => {
                this.props.deletepost(id)
                this.props.mypost()
                setTimeout(resolve, 1000);
              }),
            },
          ])
    }
    handleUpdate(postid,title,content){
        this.props.history.push(`/postupdate/${postid}/${title}/${content}`)
    }
    cardavatar(id){
        const users = this.props.home.users
        return {avatar:users[id].avatar,name:users[id].name}
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
        const userid = this.props.user._id
        const mylist = Object.values(this.props.post.mypost).sort((a,b)=>{
            Date.parse(b.post_time) - Date.parse(a.post_time)
        })
        return (
            <div id="mypost">
                <NavBar 
                className='fixd-header' 
                mode='light' 
                icon={<Icon type="left" />}
                onLeftClick={() => {this.props.history.goBack()}} 
                rightContent={
						this.state.showDelete&&mylist.length>0?<svg 
						className="icon-footer" 
						aria-hidden="true"
						onClick={()=>{
							this.setState({showDelete:!this.state.showDelete})
							}}
						>
							<use xlinkHref={"#icon-duigou"}></use>
						</svg>:<svg 
						className="icon-footer" 
						aria-hidden="true"
						onClick={()=>{
							this.setState({showDelete:!this.state.showDelete})
							}}
						>
							<use xlinkHref={"#icon-shezhi"}></use>
						</svg>
				}
                >
                我的帖子
                </NavBar>
                {/* <PostCard data={mylist} users={users} showDelete={this.state.showDelete} deletepost={this.props.deletepost()}></PostCard> */}
                <div id="postcard" style={{marginTop:'3rem'}}>
                    {
                        (mylist.length>0)?mylist.map(p=>(
                                <List key={p._id}>
                                        <Item
                                        platform="android"
                                        wrap
                                        onClick={this.state.showDelete?'':()=>this.handleClick(p._id)}
                                        extra={
                                            this.state.showDelete?<div>
                                            <Button 
                                            type="warning"
                                            onClick={()=>this.handleDelete(p._id)}
                                            >
                                            删除
                                            </Button>
                                            <Button 
                                            type="primary"
                                            onClick={()=>this.handleUpdate(p._id,p.title,p.content)}
                                            >
                                            修改
                                            </Button>
                                                </div>:"查看详情"
                                            }
                                        >
                                            {p.title}
                                            <Brief>{
                                                <div>
                                                {this.props.icons(this.cardavatar(p.author_id).avatar)}
                                                <span>{this.cardavatar(p.author_id).name}</span>
                                                <span>{this.timestampToTime(p.post_time)}</span>
                                                </div>
                                                }</Brief>  
                                        </Item>
                                    </List> 
                            )):<List>
                                <Item>
                                    <div className='empty'>
                                        你还没有发布帖子哦，快去首页发布一个吧
                                    </div>
                                </Item>
                            </List>
                            
                        }
                    <WhiteSpace/>                
                </div>
            </div>
        )
    }
}
