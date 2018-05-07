import React from 'react'
import {NavBar, Icon, List, InputItem, WhiteSpace, TextareaItem, Button, Popover,Modal} from 'antd-mobile'
import formstate from '../../component/formstate/formstate'
import { connect } from 'react-redux'
import { updatepost } from '../../redux/post.redux'
import { Redirect } from 'react-router-dom'
import {getPostList} from '../../redux/home.redux'
const alert = Modal.alert
@connect(
    state=>state,
    {updatepost}
)
@formstate
class NewPost extends React.Component {
  constructor(props) {
        super(props)
        this.state = {
            ok:''
        }
        this.handleupdate = this.handleupdate.bind(this)
    }
    handleupdate(postid){
        alert('修改', '你确定修改吗?', [
          { text: '取消' },
          { text: '确定', onPress: () =>  {
            this.setState({ok:'ok'})
            this.props.updatepost(postid,this.props.state)
          }},
        ])
    }
    goback(){
      if(this.props.state.content||this.props.state.title){
        alert('返回我的帖子', '你确定放弃当前已有的修改吗?', [
          { text: '取消' },
          { text: '确定', onPress: () =>  this.props.history.goBack() },
        ])
      }else{
        alert('返回我的帖子', '你确定放弃继续修改吗?', [
          { text: '取消' },
          { text: '确定', onPress: () =>  this.props.history.goBack() },
        ])
      }
    }
  render() {
    const Item = Popover.Item
    const {postid,title,content} = this.props.match.params
    return (
      <div>
      {this.props.post.redirectTo&&this.state.ok=='ok'?<Redirect to={this.props.post.redirectTo}/>:null}
      <NavBar 
      className='fixd-header' 
      mode='light' 
      icon={<Icon type="left" />}
      onLeftClick={() => {this.goback()}}
      >修改帖子</NavBar>
        <List style={{marginTop:'3rem'}}>
        <InputItem placeholder="标题" defaultValue={title} onChange={v=>this.props.handleChange('title',v)}></InputItem>
        <WhiteSpace/>
        <TextareaItem placeholder='内容...' 
            defaultValue={content}
            rows={10} count={1000} 
            onChange={v=>this.props.handleChange('content',v)}
            >
        </TextareaItem>
        <WhiteSpace/>
        <Button type='primary' onClick={()=>this.handleupdate(postid)}>完成</Button>
        </List>
      </div>
    )
  }
}
export default NewPost