import React from 'react'
import {NavBar, Icon, List, WhiteSpace} from 'antd-mobile'
import { connect } from 'react-redux'
import icons from '../smallComponent/myicon/icons'
import PostCard from '../home/postcard'

@connect(
    state=>state
)
@icons
export default class Mypost extends React.Component {
    render() {
        const userid = this.props.user._id
        const postlists = this.props.home.postlist
        const users = this.props.home.users
        const mylist = []
        postlists.forEach( v => {
            if(v.author_id == userid){
                mylist.push(v)
            }
        })
        return (
            <div>
                <NavBar 
                className='fixd-header' 
                mode='light' 
                icon={<Icon type="left" />}
                onLeftClick={() => {this.props.history.goBack()}}
                >
                我的帖子
                </NavBar>
                <PostCard data={mylist} users={users}></PostCard>
            </div>
        )
    }
}
