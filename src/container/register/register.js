import React from 'react'
import Logo from '../../component/smallComponent/logo/logo';
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio, Modal, Toast} from 'antd-mobile';
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import formstate from '../../component/formstate/formstate'
const alert = Modal.alert
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
        this.props.handleChange('type','')
    }
    handleRegister(){
        // alert('注册', `选定身份为“${this.props.state.type=='lingyang'?'领养人':'救助站'}”提交后不可更改，你确定提交吗？`, [
        //     { text: '取消' },
        //     { text: '确定', onPress: () =>  this.props.register(this.props.state) },
        //   ])
        if(this.props.state.type==''){
            alert('请选择身份', '领养人或救助站且提交后不可修改', [
                { text: '确定' },
            ])
        }else{
            this.props.register(this.props.state)
        }
          
    }
    returnlogin(){
        this.props.history.push('/login')
    }
    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div className="login">
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