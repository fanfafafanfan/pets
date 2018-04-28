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
        this.handlepost = this.handlepost.bind(this)
        this.state = {
            visible: false
        }
    }
    handlepost(){
        console.log(this.props);
        this.props.newposts(this.props.state)
    }
    
    onSelect(opt) {
		console.log(this.state.visible);
        this.setState({
            visible: false
        });
    }
    
    handleVisibleChange(visible) {
		console.log(visible);
        this.setState({
            visible
        });
    }
  render() {
    const Item = Popover.Item

    let offsetX = -10; // just for pc demo
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
            offsetX = -26;
        }
    return (
      <div>
      {this.props.post.redirectTo?<Redirect to={this.props.post.redirectTo}/>:null}
      <NavBar 
      className='fixd-header' 
      mode='light' 
      icon={<Icon type="left" />}
      onLeftClick={() => {this.props.history.goBack()}}
      rightContent={<Popover mask
                                     visible={this.state.visible}
                                     overlay={[
                                         (<Item key="4" value="all">全部</Item>),
                                         (<Item key="5" value="good">精华</Item>),
                                         (<Item key="6" value="share">分享</Item>),
                                         (<Item key="7" value="ask">问答</Item>),
                                         (<Item key="8" value="job">招聘</Item>),
                                     ]}
                                     popupAlign={{
                                         overflow: {adjustY: 0, adjustX: 0},
                                         offset: [offsetX, 15],
                                     }}
                                     onVisibleChange={(e)=>this.handleVisibleChange(e)}
                                     onSelect={(e)=> {
                                         this.onSelect()
                                     }}
                            >
                                <div style={{
                                    height: '100%',
                                    padding: '0 0.3rem',
                                    marginRight: '-0.3rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                    <Icon type="ellipsis"/>
                                </div>
                            </Popover>}>发布新帖</NavBar>
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