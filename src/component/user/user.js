import React from 'react'
import { connect } from 'react-redux'
import { Result,List,Button,WhiteSpace,Modal } from 'antd-mobile'
import browserCookies from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
const alert = Modal.alert;
@connect(
    state=>state.user,
    {logoutSubmit}
)
class User extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout(){
        // browserCookies.erase('userid')
        // console.log('logout')
        alert('注销', '确认退出登录吗?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                browserCookies.erase('userid')
                this.props.logoutSubmit()
            } },
          ])
    }
    render() {
        const {avatar,name,city,desc} = this.props
        const Item = List.Item
        const Brief = Item.Brief
        return this.props.user?(

            <div>
            <Result
                img={<svg className="me-icon" aria-hidden="true">
                        <use xlinkHref={"#icon-"+avatar}></use>
                    </svg>}
                title={name}
                message={desc}
            />
            <List renderHeader={()=>'简介'}  className="my-list">
                <Item
                    multipleLine
                    arrow="horizontal"
                    onClick={() => {}}
                    platform="android"
                    >
                    {name}
                </Item>
            </List>
            <List renderHeader={() => 'Subtitle'} className="my-list">
                <Item
                arrow="horizontal"
                thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                multipleLine
                onClick={() => {}}
                >
                Title <Brief>subtitle</Brief>
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