import React, { Component } from 'react'
import {Container,Col,Row,FormCheck} from 'react-bootstrap';
import './../css/login.css';
import logo from './../Images/toolLogo.png'
export default class Login extends Component {
    render() {
        return (
            <div className='container-1'>
            <Container >

                <Row className='logo-div'>
                    <Col xs={12} className='item-center'>
                        <img src={logo} width={100} height={100}></img>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} className='item-center'>
                        <span style={{fontSize : 30,fontFamily : "'Roboto', sans-serif", color : '#FD5E1F'}}>Subee Tool</span>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} >
                       <span className='label'>Email</span>
                    </Col>
                    <Col xs={12} className='item-center'>
                        <input className='inputStyle'></input>
                    </Col>
                </Row>

                <Row className='col-input' >
                    <Col xs={12} >
                        <span className='label'>Password</span>
                    </Col>
                    <Col xs={12} >
                        <input type='password' className='inputStyle'></input>
                    </Col>
                </Row>

                <Row className='col-input' >
                    
                    <Col xs={12} >
                        <input type='checkbox' value='Save log In'/><span className="label" style={{marginLeft:5}}>save log in</span>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        <button className='buttonStyle'>Log In</button>
                    </Col>
                </Row>

            </Container>
            </div>
        )
    }
}

