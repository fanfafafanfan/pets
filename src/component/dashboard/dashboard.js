import React from 'react'
import {NavBar, Icon, TabBar,Popover} from 'antd-mobile'
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router-dom'
import Home from '../../component/home/home'
import Me from '../../component/me/me'
import Msg from '../../component/msg/msg'
import NavLinkBar from './navlink'
import {getPostList} from '../../redux/home.redux'
import { getMsgList,sendMsg,recvMsg } from '../../redux/chat.redux'
import {favorlist,mypost} from '../../redux/post.redux'

@connect(
	state=>state,
	{getMsgList,recvMsg,getPostList,favorlist,mypost}  
)
class Dashboard extends React.Component {
    constructor(props) {
		super(props)
        this.state = {
            visible: false
        }
    }
    
    onSelect(opt) {
        this.setState({
            visible: false
        });
    }
    
    handleVisibleChange(visible) {
        this.setState({
            visible
        });
	}

	componentDidMount(){
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList()
			this.props.recvMsg()
		}
		this.props.getPostList()
		this.props.favorlist()
		this.props.mypost()
	}

    render(){
		const Item = Popover.Item
        const {pathname} = this.props.location
		const user = this.props.user
		const navList = [
			{
				path:'/home',
				text:'首页',
                icon:'home',
				title:'首页',
				component:Home
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Msg
			},
			{
				path:'/me',
				text:'我',
				icon:'me',
				title:'个人中心',
				component:Me
			}
		]
		
        return(
            <div>
				<div style={{marginTop:45}}>
					 <Switch>
						{navList.map(v=>(
							<Route key={v.path} path={v.path} component={v.component}/>
						))}
					</Switch>
				</div>
				<NavBar 
				className='fixd-header' 
				mode='dard' 
				rightContent={
					pathname === '/home'?(
						<svg 
						className="icon-footer" 
						aria-hidden="true"
						onClick={()=>{
							this.props.history.push('/newpost')
							}}
						>
							<use xlinkHref={"#icon-shuru"}></use>
						</svg>):('')
				}
				leftContent={
					pathname === '/home'?(
						<svg 
						className="icon-footer" 
						aria-hidden="true"
						onClick={()=>{
							this.props.history.push('/sousuo')
							}}
						>
							<use xlinkHref={"#icon-sousuo"}></use>
						</svg>):('')
				}
				>{navList.find(v=>v.path==pathname).title}</NavBar>
				
				<NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard

// rightContent={<Popover mask
// 	visible={this.state.visible}
// 	overlay={[
// 		(<Item 
// 		key="0" 
// 		value="newpost" 
// 		onClick={()=>{this.props.history.push('/newpost')}}
// 		>发帖</Item>)
// 	]}
// 	popupAlign={{
// 		overflow: {adjustY: 0, adjustX: 0},
// 	}}
// 	onVisibleChange={(e)=>this.handleVisibleChange(e)}
// 	onSelect={(e)=> {
// 		this.onSelect()
// 	}}
// >
// <div style={{
//    height: '100%',
//    padding: '0 0.3rem',
//    marginRight: '-0.3rem',
//    display: 'flex',
//    alignItems: 'center',
// }}
// >
//    <Icon type="ellipsis"/>
// </div>
// </Popover>}