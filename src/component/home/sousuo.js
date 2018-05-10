import React from 'react'
import { SearchBar, WhiteSpace, WingBlank, NavBar,Icon,Tag,List,Item,Button } from 'antd-mobile'
import { connect } from 'react-redux'
import {getPostList} from '../../redux/home.redux'
import PostCard from '../home/postcard'
@connect(
    state=>state,
    {getPostList}
)
export default class Sousuo extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            tags:[],
            searchlist:[],
            sousuo:''
        }
    }
    
    componentDidMount() {
        this.autoFocusInst.focus();
        this.props.getPostList()
      }

    remove(arr, item) {  
        var result=[];  
           for(var i=0; i<arr.length; i++){  
            if(arr[i]!=item){  
                result.push(arr[i]);  
            }  
           }  
        return result;  
    }  
    tagsChange(selected,val){
        if(selected){
            this.state.tags.push(val);
            this.setState({
                tags:this.state.tags
            })
        }else{
            this.setState({
                tags:this.remove(this.state.tags,val)
            })
        }
    }
    onChange(v){
        this.setState({
            sousuo:v
        })
    }
    handlesearch(){
        const Item = List.Item
        const searchlist = []
        const postlist = this.props.home.postlist
        postlist.forEach(v => {
            if (v.tags==this.state.tags.toString()) {
                searchlist.push(v)
            }
            if(v.tags!==this.state.tags.toString()){
                this.state.tags.forEach(t => {
                    if(v.tags.indexOf(t)>-1){
                        searchlist.push(v)
                    }
                });
            }
        })
        this.setState({
            searchlist:searchlist
        })
    }
    render() {
        const Item = List.Item
        const allimages = this.props.home.allimages
        const users = this.props.home.users
        return (
            <div id="sousuo">
                <NavBar 
                    className='fixd-header' 
                    mode='light' 
                    icon={<Icon type="left" />}
                    onLeftClick={() => {this.props.history.goBack()}}
                    >搜索标签</NavBar>
                <SearchBar
                placeholder="输入关键字(仅匹配标签)" 
                value = {this.state.tags}
                onChange={(v)=>this.onChange(v)}
                ref={ref => this.autoFocusInst = ref
                } />
                <WhiteSpace/>
                <WingBlank>
                    <div>
                        <div>
                            <Tag onChange={(selected) => { this.tagsChange(selected, '猫') }}>猫</Tag>
                            <Tag onChange={(selected) => { this.tagsChange(selected, '狗') }}>狗</Tag>
                            <Tag onChange={(selected) => { this.tagsChange(selected, '其他动物') }}>其他动物</Tag>
                            <Tag onChange={(selected) => { this.tagsChange(selected, '我要领养') }}>我要领养</Tag>
                            <Tag onChange={(selected) => { this.tagsChange(selected, '我要送养') }}>我要送养</Tag>
                            <Tag onChange={(selected) => { this.tagsChange(selected, '我是救助站') }}>我是救助站</Tag>
                        </div>
                        <WhiteSpace/>
                        <div>
                            <Button onClick={()=>this.handlesearch()}>搜索</Button>
                        </div>
                    </div>
                </WingBlank>
                
                <WhiteSpace/>
                
                      {
                        this.state.searchlist.length>0?
                        <List renderHeader={() => '搜索结果'} className="my-list">
                            <div id="searchlist">
                            <PostCard data={this.state.searchlist} users={users} imgs={allimages}></PostCard>
                            </div>
                         </List>:<List renderHeader={() => '搜索结果'} className='search-empty'>
                                            <Item>
                                                <div className='empty'>
                                                    暂无搜索结果，换一个关键词试试吧
                                                </div>
                                            </Item>
                                        </List>
                    }
            </div>
        )
    }
}
