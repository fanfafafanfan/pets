import React from 'react'
import {NavBar, Icon, List, WhiteSpace, Item} from 'antd-mobile'
import { connect } from 'react-redux'
import icons from '../smallComponent/myicon/icons'
import PostCard from '../home/postcard'
import {favorlist} from '../../redux/post.redux'
import './me.css'

@connect(
    state=>state,
    {favorlist}
)
@icons
export default class Myfavor extends React.Component {
    componentDidMount() {
        this.props.favorlist()
    }
    render() {
        const Item = List.Item
        const allimages = this.props.home.allimages        
        const userid = this.props.user._id
        const postlists = this.props.home.postlist
        const favorlist = this.props.post.favorlist
        const users = this.props.home.users
        const favor = []
        favorlist.forEach( v => {
            if(v.user_id == userid && v.collect == true){
                favor.push(v.post_id)
            }
        })
        const posts = []
        postlists.forEach(p => {
            favor.forEach(v => {
                if (p._id==v) {
                    posts.push(p)
                }
            })
        })
        const post = Object.values(posts).sort((a,b)=>{
            return Date.parse(b.post_time) - Date.parse(a.post_time)
        })
        return (
            <div id="myfavor">
                <NavBar 
                className='header' 
                mode='light' 
                icon={<Icon type="left" />}
                onLeftClick={() => {this.props.history.goBack()}}
                >
                我的收藏
                </NavBar>
                {
                    post.length>0?<div id="favorlist">
                                    <PostCard data={post} users={users} imgs={allimages}></PostCard>
                                </div>:<List className='favor-empty'>
                                            <Item>
                                                <div className='empty'>
                                                    你还没有收藏帖子哦，快去首页收藏一个吧
                                                </div>
                                            </Item>
                                        </List>
                }
            </div>
        )
    }
}
