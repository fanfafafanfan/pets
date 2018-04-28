import React from 'react'
import {NavBar, Icon, TabBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router-dom'
import Home from '../../component/home/home'
import User from '../../component/user/user'
import Msg from '../../component/msg/msg'
import NavLinkBar from '../navlink/navlink'
import {newpost} from '../../redux/user.redux'
import { getMsgList,sendMsg,recvMsg } from '../../redux/chat.redux'
// function Home(){
// 	return <h2>首页</h2>
// }
// function Msg(){
// 	return <h2>消息列表页面</h2>
// }
// function User(){
// 	return <h2>个人中心页面</h2>
// }

@connect(
	state=>state,
	{newpost,getMsgList,recvMsg }  
)
class Dashboard extends React.Component {
    constructor(props) {
		super(props)
		// this.getnewpost = this.getnewpost.bind(this)
        this.state = {
            visible: false
        }
    }
    
    onSelect(opt) {
		console.log(this.state.visible);
        this.setState({
            visible: false
        });
    }
    
    handleVisibleChange(visible) {
		console.log(this.state.visible);
        this.setState({
            visible
        });
	}

	// getnewpost(){
	// 	console.log(this.props);
	// 	this.props.newpost()
	// }

	componentDidMount(){
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList()
			this.props.recvMsg()
		}
		
	}

    render(){
        const {pathname} = this.props.location
		const user = this.props.user
		const navList = [
			{
				path:'/home',
				text:'首页',
                icon:'#icon-1',
                iconactive:'#icon-1-copy',
				title:'首页',
				component:Home
			},
			{
				path:'/msg',
				text:'消息',
				icon:'#icon-2',
                iconactive:'#icon-2-copy',
				title:'消息列表',
				component:Msg
			},
			{
				path:'/me',
				text:'我',
				icon:'#icon-3',
                iconactive:'#icon-3-copy',
				title:'个人中心',
				component:User
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
				<NavBar className='fixd-header' mode='dard' 
				rightContent={
					pathname === '/home'?(<Icon key="1" type="ellipsis" onClick={()=>{this.props.newpost}} />):('')
							}
							>{navList.find(v=>v.path==pathname).title}</NavBar>
				
				<NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard