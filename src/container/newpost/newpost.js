import React from 'react'
import {NavBar, Icon, List, InputItem, WhiteSpace, TextareaItem, Button, Popover} from 'antd-mobile'
// import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';

// const data = [{
//   url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
//   id: '2121',
// }, {
//   url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
//   id: '2122',
// }];

const Item = Popover.Item

class NewPost extends React.Component {
  
  constructor(props) {
		super(props)
        this.state = {
            visible: false
        }
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
    console.log(this.props)
    let offsetX = -10; // just for pc demo
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
            offsetX = -26;
        }
    return (
      <div>
      <NavBar className='fixd-header' mode='light' icon={<Icon type="left" />}
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
        <InputItem placeholder="标题" ></InputItem>
        <WhiteSpace/>
        <TextareaItem placeholder='内容...' 
            rows={10} count={1000}
            >
        </TextareaItem>
        <WhiteSpace/>
        <Button type='primary'>保存</Button>
        </List>
      </div>
    )
  }
}
export default NewPost