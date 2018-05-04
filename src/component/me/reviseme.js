import React from 'react'
import {NavBar, Icon, List, InputItem, WhiteSpace, TextareaItem, Button, Popover} from 'antd-mobile'
import { connect } from 'react-redux'
// import { district } from 'antd-mobile-demo-data';

@connect(
    state=>state
)
export default class Reviseme extends React.Component {
    render() {
        return (
            <div>
                <NavBar 
                className='fixd-header' 
                mode='light' 
                icon={<Icon type="left" />}
                onLeftClick={() => {this.props.history.goBack()}}
                >
                修改资料
                </NavBar>
                
            </div>
        )
    }
}

// import { district } from 'antd-mobile-demo-data';

