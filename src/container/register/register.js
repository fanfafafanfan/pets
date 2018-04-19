import React from 'react'
import Logo from '../../component/logo/logo';
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile';

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'lingyang'
        }
        this.handleRegister = this.handleRegister.bind(this)
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleRegister(){
        console.log(this.state);
    }
    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
            <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem onChange={v=>this.handleChange('user',v)}>用户</InputItem>
                        <InputItem type='password' onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
                        <InputItem type='password' onChange={v=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <RadioItem checked={this.state.type == 'lingyang'} onChange={()=>this.handleChange('type','lingyang')}>
                            领养人
                        </RadioItem>
                        <RadioItem checked={this.state.type == 'jiuzhu'}  onChange={()=>this.handleChange('type','jiuzhu')}>
                            救助站
                        </RadioItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Register