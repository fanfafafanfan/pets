import React from 'react'
import {connect} from 'react-redux'
import {List, InputItem, NavBar, Icon, Grid, WingBlank, WhiteSpace, Button, Toast} from 'antd-mobile'
import icons from '../smallComponent/myicon/icons'
import './postdetail.css'
import { favorpost, newcomment, postcomment, postimgs } from '../../redux/post.redux'
import {getPostList} from '../../redux/home.redux'
import { fixCarousel } from '../../util';
@connect(
    state=>state,
    {favorpost,getPostList,newcomment,postcomment,postimgs}
)
@icons
export default class Postdetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favor: 'favor'
        }
    }
    componentDidMount() {
        this.props.postimgs(this.props.match.params.postid)
        this.props.getPostList()
        this.props.postcomment(this.props.match.params.postid)                
    }
    componentWillMount(){
        const favorlist = this.props.post.favorlist
        const isfavor = []
        favorlist.forEach(v => {
            if (v.post_id == this.props.match.params.postid && v.user_id == this.props.user._id) {
                isfavor.push(v)
            }
        })
        if(isfavor.length>0){
            if(isfavor[0].collect){
                this.setState({favor:'favorfill'})
            }else{
                this.setState({favor:'favor'})
            }
        }
    }
    componentWillUnmount() {
        const postid = this.props.match.params.postid
        this.props.favorpost(this.state.favor,postid)
    }
    favorhandle() {
        if(this.state.favor=='favor'){
            this.setState({favor:'favorfill'})
            Toast.success('收藏成功',1)
        }else{
            this.setState({favor:'favor'})
            Toast.success('取消收藏成功',1)
        }
    }
    handleClick(v){
		this.props.history.push(`/chat/${v.author_id}`)
    }
    getLast(arr){
        return arr[arr.length-1]
    }
    timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth()+1 < 10 ? (date.getMonth()+1) : date.getMonth()+1) + '-';
        const D = date.getDate() + ' '
        const h = date.getHours() + ':'
        const m = date.getMinutes() + ':'
        const s = date.getSeconds();
        return Y+M+D+h+m+s;
    }
    handleSubmit(postid){
        this.props.newcomment({postid:postid,text:this.state.text})
        Toast.success('发表成功',1)
        this.setState({
            text:'',
            showEmoji:false
        })
        this.props.postcomment(this.props.match.params.postid)
        
    }
    render() {
        const Item = List.Item
        const Brief = Item.Brief
        const postid = this.props.match.params.postid
        const commentlist = this.props.post.commentbyid
        const users = this.props.home.users
        const postdetail = this.props.home.postlist
        const imgslist = this.props.post.imgsbyid
        const postDetail = []
        postdetail.forEach(v => {
            if (v._id == postid) {
                postDetail.push(v)
            }
        })
        const userAvatar = this.props.home.users
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))
        return (
            <div id="postdetail">
                <NavBar 
                className='fixd-header'
                mode='light'
                icon={<Icon type="left" />}
                onLeftClick={() => {this.props.history.goBack()}}
                rightContent={this.props.user._id==postDetail[0].author_id?'':<svg 
						className="icon-footer" 
						aria-hidden="true"
						onClick={()=>{
                            this.favorhandle()
							}}
						>
							<use xlinkHref={"#icon-"+this.state.favor}></use>
						</svg>}
                >
                    帖子详情
                </NavBar>
                <WingBlank>
                    <WhiteSpace/>
                    <h3>{postDetail[0].title}</h3>
                </WingBlank>
                    <List>
                        <Item extra={
                            this.props.user._id==postDetail[0].author_id?'':<Button type='primary' onClick={()=>this.handleClick(postDetail[0])}>发消息</Button>} 
                            align="top" 
                            thumb={this.props.icons(userAvatar[postDetail[0].author_id].avatar)} 
                            multipleLine>
                        {userAvatar[postDetail[0].author_id].name}
                        <Brief>{users[postDetail[0].author_id].city}</Brief>
                        <Brief>{this.timestampToTime(postDetail[0].post_time)}</Brief>
                        </Item>
                    </List>
                    <List>
                        <Item wrap>
                            <div className="content">
                                {postDetail[0].content.split('\n').map(v=><div key={v}>{v}</div>)}
                                {
                                    imgslist?imgslist.map(v=><div className="img"><img src={v.url} alt="无法显示"/></div>):''
                                }
                            </div>
                        </Item>
                    </List>
                    <div id="comment">
                        <List renderHeader={() => '评论区'}>
                            {
                                commentlist&&commentlist.length>0?commentlist.map(v=>
                                    <Item 
                                        thumb={this.props.icons(userAvatar[v.comment_id].avatar)} 
                                        multipleLine>
                                    {
                                        <div>
                                            <span>{userAvatar[v.comment_id].name}</span>
                                            <span className="time">{this.timestampToTime(v.comment_time)}</span>
                                        </div>
                                    } 
                                    <Brief>{v.content}</Brief>
                                    </Item>
                                ):<Item>
                                    <div className='empty'>
                                        空空如也
                                    </div>
                                </Item>
                            }
                        </List>
                    </div>
                    

                    <div className="stick-footer">
                    <List>
                        <InputItem
                        placeholder='输入评论'
                        value={this.state.text}
                        onChange={v=>{
                            this.setState({text:v})
                        }}
                        extra={
                            <div>
                            <span style={{marginRight:'0.8rem',display:'inline-block',height:'1.5rem',marginTop:'1px',fontSize:'18px'}}
                            onClick={()=>{
                                this.setState({
                                    showEmoji:!this.state.showEmoji
                                    })
                                fixCarousel()
                                }}
                            >🙂</span>
                            <span style={{display:'inline-block'}} 
                            onClick={()=>this.handleSubmit(postDetail[0]._id)}>评论</span>
                            </div>
                        }
                        ></InputItem>
                    </List>
                    {this.state.showEmoji?<Grid
                        data={emoji}
                        columnNum={8}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el=>{
                            this.setState({
                                text:this.state.text+el.text
                            })
                        }}
                        />:null}
                    
                </div>
            </div>
        )
    }
}
