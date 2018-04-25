import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {getPostList} from '../../redux/home.redux'

@connect(
    state=>state.home,
    {getPostList}
)
class Home extends React.Component{
    componentDidMount() {
        this.props.getPostList('lingyang')
    }
    render() {
        
        return (
            <div>
                {
                    (this.props.postlist)?this.props.postlist.map(v=>(
                        <div key={v._id}>
                            <Card>
                                <Card.Header
                                title={v.user}
                                thumb={<svg className="icon-footer" aria-hidden="true">
                                                <use xlinkHref={"#icon-"+v.avatar}></use>
                                            </svg>}
                                extra={v.desc} />
                                <Card.Body>
                                    {v.desc}
                                </Card.Body>
                            </Card> 
                            <WhiteSpace/>
                       </div>
                    )):null
                    
                }
            </div>
        )
    }
}
export default Home