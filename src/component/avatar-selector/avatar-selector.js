import React from 'react'
import { Grid, List } from 'antd-mobile'
require('../../iconfont/js/iconfont.js')
require('../../iconfont/css/avatar.css')

class AvatarSelector extends React.Component{
    constructor(props) {
        super(props)
        this.state={}
    }
    render(){
        const data = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20'.split(',').map(v => ({
            icon: `#icon-${v}`,
            text:v
        }));
        const selectedavatar = this.state.text?(<div><span>已选择</span><svg className="icon" aria-hidden="true"><use xlinkHref={'#icon-'+this.state.text}></use></svg></div>):'请选择头像';
        return (
            <div>
                <List renderHeader={()=>selectedavatar} style={{color:'#000'}}>
                    <Grid data={data} isCarousel="true" carouselMaxRow={3} columnNum={4}
                    onClick={elm=>{
                        this.setState(elm)
                        this.props.selectAvatar(elm.text)
                    }}
                    renderItem={dataItem => (
                        <div style={{margin:'1.2rem'}}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={dataItem.icon}></use>
                            </svg>
                        </div>
                    )}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelector