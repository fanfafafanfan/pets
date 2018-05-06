import React from 'react'
import { NavBar,Icon, InputItem, WhiteSpace, TextareaItem, Button,Picker,List } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update,revise} from '../../redux/user.redux'
import {fixCarousel,areaArray} from '../../util'
import '../../container/lingyanginfo/lingyang.css'
import { district } from 'antd-mobile-demo-data';

// 如果不是使用 List.Item 作为 children
const CustomChildren = props => (
    <div
      onClick={props.onClick}
      style={{ backgroundColor: '#fff', paddingLeft: 15 }}
    >
      <div className="picker" style={{ display: 'flex', height: '45px', lineHeight: '45px' }}>
        <div className="picker-title" style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
        <div className="picker-extra" style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</div>
      </div>
    </div>
  );
@connect(
    state=>state.user,
    {update,revise}
)
class LingyangInfo extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            name:'',
            sex:'',
            city:[],
            desc:'',
            ok:''
        }
    }
    handleClick(){
        this.setState({
            ok:'ok'
        })
        this.props.revise(this.state)
    }
    componentDidMount() {
        fixCarousel()
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        console.log(this.state);
        const path = this.props.history.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div id="lingyang">
                {redirect&&this.state.ok=="ok"&&redirect!=="/home"? <Redirect to={this.props.redirectTo}></Redirect> :null}
                <NavBar
                    mode='light' 
                    icon={<Icon type="left" />}
                    onLeftClick={() => {this.props.history.goBack()}}
                >
                领养人修改资料
                </NavBar>
                <AvatarSelector selectAvatar={(iconname)=>{this.setState({avatar:iconname})}}></AvatarSelector>
                <WhiteSpace/>
                <InputItem defaultValue={this.props.name} onChange={(v)=>this.onChange('name',v)}>
                    昵称
                </InputItem>
                <WhiteSpace/>
                <List style={{ backgroundColor: 'white' }} className="picker-list">
                    <Picker
                    title="选择地区"
                    extra={this.props.city}
                    data={district}
                    value={this.state.city}
                    onChange={v =>this.onChange( 'city', v )}
                    onOk={v => this.onChange( 'city', v )}
                    >
                    <CustomChildren>地区</CustomChildren>
                    </Picker>
                </List>
                <WhiteSpace/>
                <TextareaItem onChange={(v)=>this.onChange('desc',v)}
                    defaultValue={this.props.desc}
                    rows={2}
                    title='个人说明'
                    >
                </TextareaItem>
                <WhiteSpace/>
                <Button onClick={()=>{this.handleClick()}} type='primary'>修改</Button>
            </div>
        )
    }
}

export default LingyangInfo