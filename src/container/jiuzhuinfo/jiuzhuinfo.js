import React from 'react'
import { NavBar, InputItem, WhiteSpace, TextareaItem, Button,Picker,List } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'
import {fixCarousel,areaArray} from '../../util'
import '../lingyanginfo/lingyang.css'

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
    {update}
)
class JiuzhuInfo extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            name:'',
            city:[],            
            desc:''
        }
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
        console.log(this.props);
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect&&redirect!==path? <Redirect to={this.props.redirectTo}></Redirect> :null}
                <NavBar mode="dark">救助完善信息页面</NavBar>
                <AvatarSelector selectAvatar={(iconname)=>{this.setState({avatar:iconname})}}></AvatarSelector>
                <WhiteSpace/>
                <InputItem onChange={(v)=>this.onChange('name',v)}>
                救助站名称
                </InputItem>
                <WhiteSpace/>
                <List style={{ backgroundColor: 'white' }} className="picker-list">
                    <Picker
                    title="选择地区"
                    extra="请选择(可选)"
                    data={areaArray}
                    value={this.state.city}
                    onChange={v =>this.onChange( 'city', v )}
                    onOk={v => this.onChange( 'city', v )}
                    >
                    <CustomChildren>地区</CustomChildren>
                    </Picker>
                </List>
                <WhiteSpace/>
                <TextareaItem onChange={(v)=>this.onChange('desc',v)}
                    rows={2}
                    title='描述'
                    >
                </TextareaItem>
                <WhiteSpace/>
                <Button onClick={()=>{this.props.update(this.state)}} type='primary'>保存</Button>
            </div>
        )
    }
}

export default JiuzhuInfo