import React from 'react'
import {NavBar, Icon, List, InputItem, WhiteSpace, TextareaItem, Button, Popover,Modal,Toast,ImagePicker, WingBlank} from 'antd-mobile'
import formstate from '../../component/formstate/formstate'
import { connect } from 'react-redux'
import { updatepost,postimgs } from '../../redux/post.redux'
import { Redirect } from 'react-router-dom'
import {getPostList} from '../../redux/home.redux'
const alert = Modal.alert
@connect(
    state=>state,
    {updatepost,postimgs}
)
@formstate
class NewPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          files: [],          
          ok:''
        }
        this.handleupdate = this.handleupdate.bind(this)
    }
    componentDidMount(){
      this.props.postimgs(this.props.match.params.postid)
      const imgslist = this.props.post.imgsbyid
      this.setState({
        files:imgslist
      })
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
    onChange = (files, type, index) => {
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
    console.log(this.props.state);
    const Item = Popover.Item
    const {postid,title,content} = this.props.match.params
    const { files } = this.state;
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
        <Button type='primary' onClick={()=>this.handleupdate(postid)}>完成</Button>
        </List>
      </div>
    )
  }
}
export default NewPost