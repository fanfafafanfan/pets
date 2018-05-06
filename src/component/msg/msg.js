import React from 'react'
import {connect} from 'react-redux'
import { List,Badge } from 'antd-mobile'
import icons from '../smallComponent/myicon/icons'
import './msg.css'

@connect(
    state=>state
)
@icons
class Msg extends React.Component {
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
    render() {
        const {chatmsg,users} = this.props.chat
        const Item = List.Item
        const Brief = Item.Brief
        const userid = this.props.user._id
        // 根据chatid进行分组
        const msgGroup = {}
        chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = Date.parse(this.getLast(a).create_time)
            const b_last = Date.parse(this.getLast(b).create_time)
            return b_last - a_last
        })
        return (
            <div id="msglist">
                {chatList.map(v=>{
                    const LastItem = this.getLast(v)
                    const targetid = LastItem.from==userid?LastItem.to:LastItem.from
                    const unreadNum = v.filter(v=>!v.read&&v.to==userid).length
                    return(
                        <List key={LastItem._id} id="msgList">
                            <Item 
                            thumb={this.props.icons(users[targetid].avatar)}
                            extra={
                                <div>
                                    <p>{this.timestampToTime(LastItem.create_time)}</p>
                                    <Badge text={unreadNum}></Badge>
                                </div>
                                }
                                
                            arrow="horizontal"
                            platform="android"
                            onClick={() => {
                                this.props.history.push(`/chat/${targetid}`)
                            }}
                            >
                                {users[targetid].name}
                                <Brief>{LastItem.content}</Brief>                                    {v[v.length]}
                            </Item>
                        </List>
                    )
                })}
            </div>
        )
    }
}
export default Msg