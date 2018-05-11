import React from 'react'
import {Tag,NavBar, Icon, List, InputItem, WhiteSpace, TextareaItem, Button, Popover,Modal,Toast,ImagePicker, WingBlank} from 'antd-mobile'
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
          tags:[],
          tagval:['猫','狗','其他动物','我要领养','我要送养','我是救助站'],
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
        if(this.state.tags==''){
          Toast.info('请至少选择一个标签',1)
          return false
        }
        alert('修改', '你确定修改吗?', [
          { text: '取消' },
          { text: '确定', onPress: () =>  {
            this.setState({ok:'ok'})
            this.props.updatepost(postid,this.props.state,this.state.tags)
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
    remove(arr, item) {  
      var result=[];  
         for(var i=0; i<arr.length; i++){  
          if(arr[i]!=item){  
              result.push(arr[i]);  
          }  
         }  
      return result;  
    }
    tagsChange(selected,val){
      if(selected){
          this.state.tags.push(val);
          this.setState({
              tags:this.state.tags
          })
      }else{
          this.setState({
              tags:this.remove(this.state.tags,val)
          })
      }
    }
  render() {
    console.log(this.state);
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
      rightContent={<div onClick={()=>this.handleupdate(postid)}>完成</div>}
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
        <span style={{marginLeft:'15px', fontSize: '17px',color: 'rgb(169, 169, 169)'}}>至少选择一个标签：</span>
        <WhiteSpace/>
        <WingBlank>
          <Tag onChange={(selected) => { this.tagsChange(selected, '猫') }}>猫</Tag>
          <Tag onChange={(selected) => { this.tagsChange(selected, '狗') }}>狗</Tag>
          <Tag onChange={(selected) => { this.tagsChange(selected, '其他动物') }}>其他动物</Tag>
          <Tag onChange={(selected) => { this.tagsChange(selected, '我要领养') }}>我要领养</Tag>
          <Tag onChange={(selected) => { this.tagsChange(selected, '我要送养') }}>我要送养</Tag>
          <Tag onChange={(selected) => { this.tagsChange(selected, '我是救助站') }}>我是救助站</Tag>
        </WingBlank>
        <WhiteSpace/>
        <WingBlank>
          <span style={{fontSize: '17px',color: 'rgb(169, 169, 169)'}}>添加图片（最多九张）</span>
          <ImagePicker
            files={files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files?files.length < 9:'9'}
            multiple='true'
            accept="image/gif,image/jpeg,image/jpg,image/png"
          />
        </WingBlank>
        <WhiteSpace/>
        </List>
      </div>
    )
  }
}
export default NewPost