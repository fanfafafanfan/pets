import React from 'react'
// import axios from 'axios'
import {connect} from 'react-redux'
// import {getPostList} from '../../redux/home.redux'
import PostCard from './postcard'

@connect(
    state=>state
    // {getPostList}
)
class Home extends React.Component{

    componentDidMount() {
        // this.props.getPostList()
    }
    
    render() {
        return <PostCard data={this.props.home}></PostCard>
    }
}
export default Home