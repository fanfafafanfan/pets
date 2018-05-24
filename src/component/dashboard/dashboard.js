import React from 'react'
import {NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router-dom'
import Home from '../../component/home/home'
import Me from '../../component/me/me'
import Msg from '../../component/msg/msg'
import NavLinkBar from './navlink'
import {getPostList} from '../../redux/home.redux'
import { getMsgList, recvMsg } from '../../redux/chat.redux'
import {favorlist,mypost} from '../../redux/post.redux'
import { Redirect } from 'react-router-dom'

//底部dashboard栏切换页面
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
        const {pathname} = this.props.location
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
				text:'我的',
				icon:'me',
				title:'个人中心',
				component:Me
			}
		]
		const page = navList.find(v=>v.path==pathname)
        return page?(
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
				>{page.title}</NavBar>
				
				<NavLinkBar data={navList}></NavLinkBar>
            </div>
        ):<Redirect to='/home'></Redirect>
    }
}

export default Dashboard
