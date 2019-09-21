import React, { Component } from 'react'

export default class Alert extends Component {
    render() {
        return (
            <span style={{fontSize : this.props.size, color : this.props.color}}>
                {this.props.msg}
            </span>
        )
    }
}
