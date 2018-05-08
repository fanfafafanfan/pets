import React from 'react'
import { SearchBar, WhiteSpace, WingBlank, NavBar,Icon } from 'antd-mobile'

export default class Sousuo extends React.Component {
    componentDidMount() {
        this.autoFocusInst.focus();
      }
    render() {
        return (
            <div id="sousuo">
                <NavBar 
                    className='fixd-header' 
                    mode='light' 
                    icon={<Icon type="left" />}
                    onLeftClick={() => {this.props.history.goBack()}}
                    >搜索</NavBar>
                <SearchBar placeholder="输入关键字" ref={ref => this.autoFocusInst = ref} />
            </div>
        )
    }
}
