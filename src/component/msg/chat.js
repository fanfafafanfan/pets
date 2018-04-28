import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import io  from 'socket.io-client'
import {connect} from 'react-redux'
import { getMsgList,sendMsg,recvMsg,readMsg } from '../../redux/chat.redux'
import { getChatId,fixCarousel } from '../../util';
import icons from '../smallComponent/myicon/icons'

const socket = io('ws://localhost:9093')

@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg,readMsg}
)
@icons
class Chat extends React.Component{
    constructor(props) {
        super(props)
        this.state={text:'',msg:[]}
    }
    componentDidMount() {
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
        fixCarousel()

        // socket.on('recvmsg',(data) => {
        //     this.setState({
        //         msg:[...this.state.msg,data.text]
        //     })
        // })
    }
    componentWillUnmount() {
        const to = this.props.match.params.userid
        this.props.readMsg(to)
    }
    
    handleSubmit(){
        // socket.emit('sendmsg',{text:this.state.text})
        // this.setState({text:''})
        // console.log(this.props);
        const from = this.props.user._id
        const to =this.props.match.params.userid
        const msg = this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({
            text:'',
            showEmoji:false
        })
    }
    render() {
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))
        const userid = this.props.match.params.userid
        const Item = List.Item
        const users = this.props.chat.users
        if(!users[userid]){
            return null
        }
        const chatid = getChatId(userid,this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
        return (
            <div id='chat-page'>
                <NavBar 
                mode='dark'
                icon={<Icon type="left" />}
                onLeftClick={() => {this.props.history.goBack()}}
                >
                    {users[userid].name}
                </NavBar>

                {chatmsgs.map(v=>{
                    return v.from==userid?(
                        <List key={v._id}>
                            <Item
                            thumb={this.props.icons(users[v.from].avatar)}
                            >{v.content}</Item>
                        </List>
                        ):(
                        <List key={v._id}>
                            <Item 
                            className='chat-me'
                            extra={this.props.icons(this.props.user.avatar)}
                            >{v.content}</Item>
                        </List>
                            )
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                        placeholder='请输入'
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
                            onClick={()=>this.handleSubmit()}>发送</span>
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
export default Chat