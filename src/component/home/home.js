import React from 'react'
import { Tabs, Badge } from 'antd-mobile'
import {connect} from 'react-redux'
import {getPostList} from '../../redux/home.redux'
import PostCard from './postcard'

@connect(
    state=>state,
    {getPostList}
)
class Home extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            tabindex: 0
        }
    }
    componentDidMount() {
        this.props.getPostList()
    }
    render() {
        const tabs = [
            { title: <Badge>私人领养</Badge> },
            { title: <Badge>救助站</Badge> },
          ];
        const users = this.props.home.users
        const postlist = this.props.home.postlist
        const lingyanglist = []
        const jiuzhulist = []
        postlist.forEach(v => {
            if(users[v.author_id].type=="lingyang"){
                lingyanglist.push(v)
            }else{
                jiuzhulist.push(v)
            }
        })
        return (
            <div id="home">
                <Tabs tabs={tabs}
                    initialPage={this.state.tabindex}
                    onTabClick={(tab, index) => { this.setState({tabindex:index}) }}
                    >
                    <div style={{ alignItems: 'center', justifyContent: 'center', height: '590px', backgroundColor: '#fff' }}>
                        
                            <PostCard data={lingyanglist} users={this.props.home.users}></PostCard>
                        
                    </div>
                    <div style={{ alignItems: 'center', justifyContent: 'center', height: '590px', backgroundColor: '#fff' }}>
                        
                            <PostCard data={jiuzhulist} users={this.props.home.users}></PostCard>
                        
                    </div>
                </Tabs>
            </div>
        )
    }
}
export default Home