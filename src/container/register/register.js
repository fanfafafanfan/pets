import React from 'react'
import Logo from '../../component/smallComponent/logo/logo';
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile';
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import formstate from '../../component/formstate/formstate'

@connect(
    state=>state.user,
    {register}
)
@formstate
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.handleRegister = this.handleRegister.bind(this)
        this.returnlogin = this.returnlogin.bind(this)
    }
    componentDidMount() {
        this.props.handleChange('type','lingyang')
    }
    handleRegister(){
        this.props.register(this.props.state)
    }
    returnlogin(){
        this.props.history.push('/login')
    }
    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo&&this.props.redirectTo!=='/login'?<Redirect to={this.props.redirectTo}/>:null}
            <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem onChange={v=>this.props.handleChange('user',v)}>账号</InputItem>
                        <InputItem type='password' onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
                        <InputItem type='password' onChange={v=>this.props.handleChange('repeatpwd',v)}>确认密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <RadioItem checked={this.props.state.type == 'lingyang'} onChange={()=>this.props.handleChange('type','lingyang')}>
                            领养人
                        </RadioItem>
                        <RadioItem checked={this.props.state.type == 'jiuzhu'}  onChange={()=>this.props.handleChange('type','jiuzhu')}>
                            救助站
                        </RadioItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                    <WhiteSpace/>
                    <Button onClick={this.returnlogin}>返回登录</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Register