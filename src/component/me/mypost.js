import React from 'react'
import {NavBar, Icon, List, Brief, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import icons from '../smallComponent/myicon/icons'
import PostCard from '../home/postcard'
import {deletepost,mypost} from '../../redux/post.redux'

@connect(
    state=>state,
    {deletepost,mypost}
)
@icons
export default class Mypost extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            showDelete:false
        }
    }
    handleClick(id){
        // console.log(this.props)
        this.props.history.push(`/postdetail/${id}`)
    }
    handleDelete(id){
        console.log(id);
        this.props.deletepost(id)
        this.props.mypost()
    }
    cardavatar(id){
        const users = this.props.home.users
        return {avatar:users[id].avatar,name:users[id].name}
    }
    render() {
        const Item = List.Item
        const Brief = Item.Brief
        console.log(this.state.showDelete);
        const userid = this.props.user._id
        const mylist = this.props.post.mypost
        
        return (
            <div>
                <NavBar 
                className='fixd-header' 
                mode='light' 
                icon={<Icon type="left" />}
                onLeftClick={() => {this.props.history.goBack()}} 
                rightContent={
						<svg 
						className="icon-footer" 
						aria-hidden="true"
						onClick={()=>{
							this.setState({showDelete:!this.state.showDelete})
							}}
						>
							<use xlinkHref={"#icon-dog"}></use>
						</svg>
				}
                >
                我的帖子
                </NavBar>
                {/* <PostCard data={mylist} users={users} showDelete={this.state.showDelete} deletepost={this.props.deletepost()}></PostCard> */}
                <div id="postcard" style={{marginTop:'3rem'}}>
                    {
                        (mylist)?mylist.map(p=>(
                                <List key={p._id}>
                                        <Item
                                        platform="android"
                                        wrap
                                        onClick={this.state.showDelete?'':()=>this.handleClick(p._id)}
                                        extra={
                                            this.state.showDelete?<Button 
                                            type="warning"
                                            onClick={()=>this.handleDelete(p._id)}
                                            >
                                            删除
                                            </Button>:null
                                            }
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
            </div>
        )
    }
}
