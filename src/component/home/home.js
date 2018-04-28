import React from 'react'
// import axios from 'axios'
import {connect} from 'react-redux'
import {getPostList} from '../../redux/home.redux'
import PostCard from '../postcard/postcard'

@connect(
    state=>state.home,
    {getPostList}
)
class Home extends React.Component{

    componentDidMount() {
        this.props.getPostList()
    }
    
    render() {
        return <PostCard postlist={this.props.postlist}></PostCard>
    }
}
export default Home