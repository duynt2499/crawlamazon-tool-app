import React, { Component } from 'react'
import {Container,Col,Row} from 'react-bootstrap';
import './../css/login.css';
import logo from './../Images/toolLogo.png'
import ReactLoading from 'react-loading';
import axios from 'axios';
import BASE_URL from './../util/globalVar'
import Alert from './../Components/Alert';

import {
    Redirect,
  } from "react-router-dom";
export default class Login extends Component {

    state = {
        isLoading : false,
        email : '',
        password :'',
        msg : '',
        redirectToReferrer: false
    }

    login = () => {
        this.props.fakeAuth.authenticate(() => {
          this.setState({ redirectToReferrer: true });
        });
      };


    submitUSer = async () => {
        

       try {
           this.setState({
               isLoading : true
           })
        let test = await axios.get(`${BASE_URL}/api/users/signIn?email=${this.state.email}&password=${this.state.password}`);
        this.setState({isLoading : true});

        await setTimeout(()=>{
            this.setState({isLoading : false});
            if(test.data.status === 204)
            {
                this.setState({msg : test.data.errors[0].msg})
            }
            else if(test.data.status === 200)
            {
                console.log(test.data)
                localStorage.setItem('token', test.data.token.role);
                this.login();
                
            }
            
        },2001);
        
       } catch (error) {
        this.setState({isLoading : false,msg : 'Không kết nối được đến server, vui lòng vào run file server'});
       }
        
    }

    _renderLoadingBar = () => {
        return this.state.isLoading === true ? <ReactLoading type='spin' color='#FD5E1F' height={30} width={30} /> : '';
    }


    _renderAlert = () => {
        return this.state.msg !== '' ? <Alert color='red' msg={this.state.msg} size={13}></Alert> : '';
    }

    render() {
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to='/manager' />;
        return (
            <div className='container-parent'>
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
                        <input onChange={(e) => {this.setState({email : e.target.value})}} className='inputStyle'></input>
                    </Col>
                </Row>

                <Row className='col-input' >
                    <Col xs={12} >
                        <span className='label'>Password</span>
                    </Col>
                    <Col xs={12} >
                        <input onChange={(e) => {this.setState({password : e.target.value})}} type='password' className='inputStyle'></input>
                    </Col>
                </Row>

                <Row className='col-input' >
                    
                    <Col xs={12} >
                        <input type='checkbox' value='true'/><span className="label" style={{marginLeft:5}}>lưu đăng nhập</span>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        <button onClick={() => {this.submitUSer()}} className='buttonStyle'>Đăng nhập</button>
                    </Col>
                </Row>

                <Row style={{marginTop : 20}}>
                    <Col xs={12} className='item-center'>
                       {this._renderLoadingBar()}
                    </Col>
                </Row>

                <Row style={{marginTop : 20}}>
                    
                    <Col xs={12} className='item-center'>
                       {this._renderAlert()}
                    </Col>
                </Row>

            </Container>
           
            </div>
           </div>
        )
    }
}

