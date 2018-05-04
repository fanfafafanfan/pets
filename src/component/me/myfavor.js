import React from 'react'
import {NavBar, Icon, List, WhiteSpace} from 'antd-mobile'
import { connect } from 'react-redux'
import icons from '../smallComponent/myicon/icons'
import PostCard from '../home/postcard'
import {favorlist} from '../../redux/post.redux'

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
        const post = []
        postlists.forEach(p => {
            favor.forEach(v => {
            if (p._id==v) {
                post.push(p)
            }
        });
        });
        return (
            <div>
                <NavBar 
                className='fixd-header' 
                mode='light' 
                icon={<Icon type="left" />}
                onLeftClick={() => {this.props.history.goBack()}}
                >
                我的收藏
                </NavBar>
                <PostCard data={post} users={users}></PostCard>
            </div>
        )
    }
}
