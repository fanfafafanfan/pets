
import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class NavLinkBar extends React.Component{
	// static propTypes = {
	// 	data: PropTypes.array.isRequired
	// }
	render(){
		
		const navList = this.props.data
		const {pathname} = this.props.location
		return (
			<TabBar>
				{navList.map(v=>(
					<TabBar.Item
						key={v.path}
						title={v.text}
						icon={<svg className="icon-footer" aria-hidden="true">
                                <use xlinkHref={v.icon}></use>
                            </svg>}
						selectedIcon={<svg className="icon-footer" aria-hidden="true">
                                        <use xlinkHref={v.iconactive}></use>
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