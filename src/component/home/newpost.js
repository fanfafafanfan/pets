import React from 'react'
import {NavBar, Icon, List, InputItem, WhiteSpace, TextareaItem, Button,Toast,ImagePicker, WingBlank} from 'antd-mobile'
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
          files: [],
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
    onChange(files, type, index){
      if(files.length<10){
        const urls = []
        files.forEach(v => {
          urls.push(v.url)
        });
        const posttime = new Date()
          this.props.handleChange('urls',urls)
          this.props.handleChange('posttime',posttime)
          this.setState({
            files
          });
      }else{
        Toast.info('图片不能超过九张',1)
        return false
      }
    }
  render() {
    const { files } = this.state
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
            rows={10} count={1000} 
            onChange={v=>this.props.handleChange('content',v)}
            >
        </TextareaItem>
        <WhiteSpace/>
        <WingBlank>
          <span style={{fontSize: '17px',color: 'rgb(169, 169, 169)'}}>添加图片（最多九张）</span>
          <ImagePicker
            files={files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 9}
            multiple='true'
            accept="image/gif,image/jpeg,image/jpg,image/png"
          />
        </WingBlank>
        <WhiteSpace/>
        <Button type='primary' onClick={this.handlepost}>发布</Button>
        </List>
      </div>
    )
  }
}
export default NewPost