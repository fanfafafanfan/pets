import React from 'react'

export default function icons(Comp) {
    return class Setformstsate extends React.Component{
        constructor(props){
			super(props)
			this.state = {}
			this.icons = this.icons.bind(this)
		}
		icons(ava){
            return (
                <svg className="icon-footer" aria-hidden="true">
                    <use xlinkHref={"#icon-"+ava}></use>
                </svg>
            )
        }
        render() {
            return (
                <Comp icons={this.icons} state={this.state} {...this.props}></Comp>
            )
        }
    }
}