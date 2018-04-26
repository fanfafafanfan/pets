import React from 'react'
import {connect} from 'react-redux'

@connect(
    state=>state
)

class Chat extends React.Component{
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        
        return (
            <div>
                <h2>chat with user:{this.props.match.params.user}</h2>
            </div>
        )
    }
}
export default Chat