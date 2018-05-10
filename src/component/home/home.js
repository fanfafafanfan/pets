import React from 'react'
import { Tabs, Badge, List, Carousel, WingBlank } from 'antd-mobile'
import {connect} from 'react-redux'
import {getPostList,allpostimgs} from '../../redux/home.redux'
import PostCard from './postcard'
import './postdetail.css'
const Item = List.Item

@connect(
    state=>state,
    {getPostList,allpostimgs}
)
class Home extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            data: ['1', '2', '3'],
            imgHeight: 176,
            tabindex: 0
        }
    }
    componentDidMount() {
        this.props.getPostList()
        this.props.allpostimgs()
        setTimeout(() => {
            this.setState({
              data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
          }, 100);
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
        const allimages = this.props.home.allimages
        return (
            <div id="home">
                <Carousel
                autoplay={false}
                infinite
                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                afterChange={index => console.log('slide to', index)}
                >
                {this.state.data.map(val => (
                    <a
                    key={val}
                    href="http://www.alipay.com"
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                    >
                    <img
                        src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                        this.setState({ imgHeight: 'auto' });
                        }}
                    />
                    </a>
                ))}
                </Carousel>
                <Tabs tabs={tabs}
                    initialPage={this.state.tabindex}
                    onTabClick={(tab, index) => { this.setState({tabindex:index}) }}
                    >
                    <div style={{ alignItems: 'center', justifyContent: 'center', height: '590px', backgroundColor: '#fff' }}>
                        {
                            lingyanglist.length>0?<PostCard 
                            data={lingyanglist} 
                            users={users}
                            imgs={allimages}
                            >
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
                            users={users}
                            imgs={allimages}
                            >
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