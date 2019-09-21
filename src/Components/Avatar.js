import React, { Component } from 'react';

class Avatar extends Component {
    render() {
        return (
            <div style={{width : this.props.width, height:this.props.height,borderRadius : '50%', overflow :'hidden'}}>
               <img src={this.props.src} width={this.props.width} height={this.props.height}></img>
            </div>
            
        );
    }
}

export default Avatar;