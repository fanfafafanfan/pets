import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@withRouter
@connect(
	state=>state.chat
)
class NavLinkBar extends React.Component {
	// static propTypes = {
	// 	data: PropTypes.array.isRequired
	// }
	render(){
		// console.log(this.props);
		const navList = this.props.data
		const {pathname} = this.props.location
		return (
			<TabBar>
				{navList.map(v=>(
					<TabBar.Item
						badge={v.path=='/msg'?this.props.unread:''}
						key={v.path}
						title={v.text}
						icon={<svg className="icon-footer" aria-hidden="true">
                                <use xlinkHref={v.icon}></use>
                            </svg>}
						selectedIcon={<svg className="icon-footer" aria-hidden="true">
                                        <use xlinkHref={v.icon+"-copy"}></use>
                                    </svg>}
						selected={pathname===v.path}
						onPress={()=>{
							this.props.history.push(v.path)
						}}
					>
					
					</TabBar.Item>
				))}
			</TabBar>
		)
	}
}

export default NavLinkBar