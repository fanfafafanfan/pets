import React from 'react'
import { NavBar,Icon,InputItem, WhiteSpace, TextareaItem, Button,Picker,List,Modal  } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update,revise} from '../../redux/user.redux'
import {fixCarousel,areaArray} from '../../util'
import '../../container/lingyanginfo/lingyang.css'
// import { district } from 'antd-mobile-demo-data';
const alert = Modal.alert
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
class JiuzhuInfo extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            name:'',
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
    goback(){
        if(this.state.name!==""||this.state.avatar||this.state.city.length>0||this.state.desc!==""){
            alert('修改', '你确定放弃当前已有的修改吗?', [
                { text: '取消' },
                { text: '确定', onPress: () =>  this.props.history.goBack() },
              ])
        }else{
            alert('修改', '你确定放弃继续修改吗?', [
                { text: '取消' },
                { text: '确定', onPress: () =>  this.props.history.goBack() },
              ])
        }
    }
    render(){
        const redirect = this.props.redirectTo
        return (
            <div id="jiuzhu">
                {redirect&&this.state.ok=="ok"&&redirect!=="/home"? <Redirect to={this.props.redirectTo}></Redirect> :null}
                <NavBar 
                    mode='light' 
                    icon={<Icon type="left" />}
                    onLeftClick={() => {this.goback()}}
                >
                救助站修改资料
                </NavBar>
                <AvatarSelector selectAvatar={(iconname)=>{this.setState({avatar:iconname})}}></AvatarSelector>
                <WhiteSpace/>
                <InputItem defaultValue={this.props.name} onChange={(v)=>this.onChange('name',v)}>
                救助站名称
                </InputItem>
                <WhiteSpace/>
                <List style={{ backgroundColor: 'white' }} className="picker-list">
                    <Picker
                    title="选择地区"
                    extra={this.props.city}
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
                    defaultValue={this.props.desc}
                    rows={2}
                    title='描述'
                    >
                </TextareaItem>
                <WhiteSpace/>
                <Button onClick={()=>{this.handleClick()}} type='primary'>修改</Button>
            </div>
        )
    }
}

export default JiuzhuInfo