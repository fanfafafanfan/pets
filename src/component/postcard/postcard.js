import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace,WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class PostCard extends React.Component{
    // 跳转到聊天的页面
    handleClick(v){
        // console.log(this.props)
        this.props.history.push(`/chat/${v._id}`)
    }
 render() {
    const Header = Card.Header
    const Body = Card.Body
     return (
         <div>
             <WhiteSpace/>
             {
                 (this.props.postlist)?this.props.postlist.map(v=>(
                            <Card key={v._id} 
                            onClick={()=>this.handleClick(v)}
                            >
                                <Header
                                title={v.name}
                                thumb={<svg className="icon-footer" aria-hidden="true">
                                                <use xlinkHref={"#icon-"+v.avatar}></use>
                                            </svg>}
                                extra={v.desc} />
                                <Body>
                                    {v.desc}
                                </Body>
                            </Card> 
                    )):null
                }
         </div>
     );
 }
}
export default PostCard