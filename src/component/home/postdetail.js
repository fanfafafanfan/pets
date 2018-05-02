import React from 'react'
import {connect} from 'react-redux'
import {List, InputItem, NavBar, Icon, Grid, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import icons from '../smallComponent/myicon/icons'
import './postdetail.css'
import { favorpost } from '../../redux/post.redux'
@connect(
    state=>state,
    {favorpost}
)
@icons
export default class Postdetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favor: 'favor'
        }
    }
    componentWillMount(){
        const favorlist = this.props.post.favorlist
        const isfavor = []
        favorlist.forEach(v => {
            if (v.post_id == this.props.match.params.postid && v.user_id == this.props.user._id) {
                isfavor.push(v)
            }
        })
        if(isfavor.length>0){
            if(isfavor[0].collect){
                this.setState({favor:'favorfill'})
            }else{
                this.setState({favor:'favor'})
            }
        }
        
    }
    componentWillUnmount() {
        const postid = this.props.match.params.postid
        this.props.favorpost(this.state.favor,postid)
    }
    favorhandle() {
        if(this.state.favor=='favor'){
            this.setState({favor:'favorfill'})
        }else{
            this.setState({favor:'favor'})
        }
    }
    handleClick(v){
		this.props.history.push(`/chat/${v.author_id}`)
	}
    render() {
        const Item = List.Item
        const Brief = Item.Brief
        const postid = this.props.match.params.postid
        const postdetail = this.props.home.postlist
        const postDetail = []
        postdetail.forEach(v => {
            if (v._id == postid) {
                postDetail.push(v)
            }
        })
        const userAvatar = this.props.home.users
        
        return (
            <div id="postdetail">
                <NavBar 
                mode='light'
                icon={<Icon type="left" />}
                onLeftClick={() => {this.props.history.goBack()}}
                rightContent={<svg 
						className="icon-footer" 
						aria-hidden="true"
						onClick={()=>{
                            this.favorhandle()
							{/* this.props.history.push('/newpost') */}
							}}
						>
							<use xlinkHref={"#icon-"+this.state.favor}></use>
						</svg>}
                >
                    帖子详情
                </NavBar>
                <WingBlank>
                    <WhiteSpace/>
                    <h3>{postDetail[0].title}</h3>
                </WingBlank>
                    <List>
                        <Item extra={
                            this.props.user._id==postDetail[0].author_id?'':<Button type='primary' onClick={()=>this.handleClick(postDetail[0])}>发消息</Button>} 
                            align="top" 
                            thumb={this.props.icons(userAvatar[postDetail[0].author_id].avatar)} 
                            multipleLine>
                        {userAvatar[postDetail[0].author_id].name} 
                        <Brief>{postDetail[0].post_time}</Brief>
                        </Item>
                    </List>
                    <List>
                        <Item wrap>{postDetail[0].content}</Item>
                    </List>
            </div>
        )
    }
}
