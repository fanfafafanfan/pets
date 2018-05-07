import React from 'react'
import { Tabs, Badge, List } from 'antd-mobile'
import {connect} from 'react-redux'
import {getPostList} from '../../redux/home.redux'
import PostCard from './postcard'
const Item = List.Item

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
                        {
                            lingyanglist.length>0?<PostCard 
                            data={lingyanglist} 
                            users={this.props.home.users}>
                            </PostCard>:<List>
                                            <Item>
                                                <div className='empty'>
                                                    没有帖子哦，快去发布一个吧
                                                </div>
                                            </Item>
                                        </List>
                            
                        }
                    </div>
                    <div style={{ alignItems: 'center', justifyContent: 'center', height: '590px', backgroundColor: '#fff' }}>
                        {
                            jiuzhulist.length>0?<PostCard 
                            data={jiuzhulist} 
                            users={this.props.home.users}>
                            </PostCard>:<List>
                                            <Item>
                                                <div className='empty'>
                                                    没有帖子哦，快去发布一个吧
                                                </div>
                                            </Item>
                                        </List>
                            
                        }
                    </div>
                </Tabs>
            </div>
        )
    }
}
export default Home