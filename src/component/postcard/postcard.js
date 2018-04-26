import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace,WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class PostCard extends React.Component{
    handleClick(v){
        console.log(this.props)
        this.props.history.push(`/chat/${v.user}`)
    }
 render() {
    const Header = Card.Header
    const Body = Card.Body
    {console.log(this.props);}
     return (
         <WingBlank>
             <WhiteSpace/>
             {
                 (this.props.postlist)?this.props.postlist.map(v=>(
                            <Card key={v._id}
                            onClick={()=>this.handleClick(v)}
                            >
                                <Header
                                title={v.user}
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
                
         </WingBlank>
     );
 }
}
export default PostCard