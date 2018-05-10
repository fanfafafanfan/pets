import React from 'react'
import {NavBar, Icon, List, InputItem, WhiteSpace, TextareaItem, Button,Toast,ImagePicker, WingBlank,Tag} from 'antd-mobile'
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
          tags:[],
          ok:''
        }
        this.handlepost = this.handlepost.bind(this)
    }
    handlepost(){
      // const posttime = new Date()
      // this.props.handleChange('posttime',posttime)
      if(!this.props.state.title){
        Toast.info('标题不能为空',1)
        return false
      }
      else if(!this.props.state.content){
        Toast.info('内容不能为空',1)
        return false
      }
      else if(this.state.tags==''){
        Toast.info('请至少选择一个标签',1)
        return false
      }
        this.setState({
          ok:'ok',
        })
        this.props.newposts(this.props.state,this.state.tags)
    }
    onChange = (files, type, index) => {
      if(files.length<10){
        const urls = []
        files.forEach(v => {
          urls.push(v.url)
        });
        this.props.handleChange('urls',urls)
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
      console.log(selected,val);
      if(selected){
          this.state.tags.push(val);
          this.setState({
              tags:this.state.tags
          })
      }else{
          this.setState({
              tags:this.remove(this.state.tags,val)
          })
          console.log(this.state);
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
      rightContent={<div onClick={()=>this.handlepost()}>发布</div>}
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
            selectable={files.length < 9}
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