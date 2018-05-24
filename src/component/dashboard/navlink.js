import React from 'react'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import icons from '../smallComponent/myicon/icons'

@withRouter
@connect(
	state=>state.chat
)
@icons
class NavLinkBar extends React.Component {
	render(){
		const navList = this.props.data
		const {pathname} = this.props.location
		return (
			<TabBar>
				{navList.map(v=>(
					<TabBar.Item
						badge={v.path=='/msg'?this.props.unread:''}
						key={v.path}
						title={v.text}
						icon={this.props.icons(v.icon)}
						selectedIcon={this.props.icons(v.icon+"-fill")}
						selected={pathname===v.path}
						onPress={()=>{
							this.props.history.push(v.path)
						}}
					></TabBar.Item>
				))}
			</TabBar>
		)
	}
}

export default NavLinkBar