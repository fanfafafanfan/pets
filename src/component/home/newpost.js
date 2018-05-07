import React from 'react'
import {NavBar, Icon, List, InputItem, WhiteSpace, TextareaItem, Button,Toast} from 'antd-mobile'
import formstate from '../../component/formstate/formstate'
import { connect } from 'react-redux'
import { newposts } from '../../redux/post.redux'
import { Redirect } from 'react-router-dom'

@connect(
    state=>state,
    {newposts}
)
@formstate
class NewPost extends React.Component {
  constructor(props) {
        super(props)
        this.state = {
          ok:''
        }
        this.handlepost = this.handlepost.bind(this)
    }
    handlepost(){
      if(!this.props.state.title){
        Toast.info('标题不能为空',1)
        return false
      }
      else if(!this.props.state.content){
        Toast.info('内容不能为空',1)
        return false
      }
        this.setState({
          ok:'ok'
        })
        this.props.newposts(this.props.state)
    }
    
  render() {
    return (
      <div id="newpost">
      {this.props.post.redirectTo&&this.state.ok=='ok'?<Redirect to={this.props.post.redirectTo}/>:null}
      <NavBar 
      className='fixd-header' 
      mode='light' 
      icon={<Icon type="left" />}
      onLeftClick={() => {this.props.history.goBack()}}
      >发布新帖</NavBar>
        <List style={{marginTop:'3rem'}}>
        <TextareaItem placeholder="标题"
            rows={1} count={30}
            onChange={v=>this.props.handleChange('title',v)}
            >
        </TextareaItem>
        <WhiteSpace/>
        <TextareaItem placeholder='内容...' 
            rows={21} count={1000} 
            onChange={v=>this.props.handleChange('content',v)}
            >
        </TextareaItem>
        <WhiteSpace/>
        <Button type='primary' onClick={this.handlepost}>发布</Button>
        </List>
      </div>
    )
  }
}
export default NewPost