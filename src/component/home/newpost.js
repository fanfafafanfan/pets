import React from 'react'
import {NavBar, Icon, List, InputItem, WhiteSpace, TextareaItem, Button, Popover} from 'antd-mobile'
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
        this.setState({
          ok:'ok'
        })
        this.props.newposts(this.props.state)
    }
    
  render() {
    const Item = Popover.Item
    return (
      <div>
      {this.props.post.redirectTo&&this.state.ok=='ok'?<Redirect to={this.props.post.redirectTo}/>:null}
      <NavBar 
      className='fixd-header' 
      mode='light' 
      icon={<Icon type="left" />}
      onLeftClick={() => {this.props.history.goBack()}}
      >发布新帖</NavBar>
        <List style={{marginTop:'3rem'}}>
        <InputItem placeholder="标题" onChange={v=>this.props.handleChange('title',v)}></InputItem>
        <WhiteSpace/>
        <TextareaItem placeholder='内容...' 
            rows={10} count={1000} 
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