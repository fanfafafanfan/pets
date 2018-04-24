import React from 'react'
import {NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'

function Home(){
	return <h2>首页</h2>
}
function Msg(){
	return <h2>消息列表页面</h2>
}
function User(){
	return <h2>个人中心页面</h2>
}

@connect(
    state=>state    
)
class Dashboard extends React.Component {

    
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
                <NavBar className='fixd-header' mode='dard'>{navList.find(v=>v.path==pathname).title}</NavBar>
                <Switch>
                    
                </Switch>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard