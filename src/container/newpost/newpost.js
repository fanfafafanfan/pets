import React from 'react'
import {NavBar, Icon, List, InputItem, WhiteSpace, TextareaItem} from 'antd-mobile'
// import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';

// const data = [{
//   url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
//   id: '2121',
// }, {
//   url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
//   id: '2122',
// }];
class NewPost extends React.Component {
  render() {
    return (
      <div>
      <NavBar className='fixd-header' mode='light' icon={<Icon type="left" />}
      rightContent={[<Icon key="0" type="ellipsis" />]}>发布新帖</NavBar>
        <List style={{marginTop:'3rem'}}>
        <InputItem placeholder="标题" ></InputItem>
        <WhiteSpace/>
        <TextareaItem placeholder='内容...' 
            rows={8} count={1000}
            >
        </TextareaItem>
        </List>
      </div>
    )
  }
}
export default NewPost