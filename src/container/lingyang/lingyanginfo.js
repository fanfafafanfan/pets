import React from 'react'
import { NavBar, InputItem, WhiteSpace, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'
@connect(
    state=>state.user,
    {update}
)
class LingyangInfo extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            name:'',
            city:'',
            desc:''
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect&&redirect!==path? <Redirect to={this.props.redirectTo}></Redirect> :null}
                <NavBar mode="dark">领养完善信息页面</NavBar>
                <AvatarSelector selectAvatar={(iconname)=>{this.setState({avatar:iconname})}}></AvatarSelector>
                <WhiteSpace/>
                <InputItem onChange={(v)=>this.onChange('name',v)}>
                    昵称
                </InputItem>
                <WhiteSpace/>
                <InputItem onChange={(v)=>this.onChange('city',v)}>
                    城市
                </InputItem>
                <WhiteSpace/>
                <TextareaItem onChange={(v)=>this.onChange('desc',v)}
                    rows={2}
                    title='个人说明'
                    >
                </TextareaItem>
                <WhiteSpace/>
                <Button onClick={()=>{this.props.update(this.state)}} type='primary'>保存</Button>
            </div>
        )
    }
}

export default LingyangInfo