import React from 'react'
import { connect } from 'react-redux'
import { Result,List,Button,WhiteSpace,Modal } from 'antd-mobile'
import browserCookies from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import icons from '../smallComponent/myicon/icons'
import './user.css'
const alert = Modal.alert;
@connect(
    state=>state.user,
    {logoutSubmit}
)
@icons
class User extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout(){
        alert('注销', '确认退出登录吗?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                browserCookies.erase('userid')
                this.props.logoutSubmit()
            } },
          ])
    }
    render() {
        const {avatar,name,city,desc,icons} = this.props
        const Item = List.Item
        const Brief = Item.Brief
        return this.props.user?(

            <div id="me-icon">
            <Result
                img={icons(avatar)}
                title={name}
                message={desc}
            />
            <WhiteSpace/>
            <List className="my-list">
                <Item
                    multipleLine
                    arrow="horizontal"
                    onClick={() => {}}
                    platform="android"
                    >
                    修改资料
                </Item>
            </List>
            <WhiteSpace/>
            <List className="my-list">
                <Item
                arrow="horizontal"
                platform="android"
                multipleLine
                onClick={() => {}}
                >
                我发布的
                </Item>
            </List>
            <WhiteSpace/>
            <List className="my-list">
                <Item
                arrow="horizontal"
                platform="android"
                multipleLine
                onClick={() => {}}
                >
                我收藏的
                </Item>
            </List>
            <WhiteSpace/>
            <List>
                <Item onClick={this.logout}
                    platform="android"
                    >
                    退出登录
                </Item>
            </List>
            </div>
        ): <Redirect to={this.props.redirectTo} />
    }
}
export default User