import React, { Component } from 'react'
import {Navbar, Nav,FormControl , Button,Form} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import Avatar from './../Components/Avatar';
import { FaSignOutAlt } from 'react-icons/fa';
import './../css/managerPage.css';
import Crawler from './ChilPage/Crawler';
import CrawlerHistory from './ChilPage/HistoryCrawler'
import {FaSpider} from 'react-icons/fa'
export default class ManagerPage extends Component {

    state = {
        page : 'crawler'
    }
   

    render() {
        return (
            <div>
            <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home" style={{color:'#FD5E1F'}}>
            <FaSpider style={{fontSize : 25}}/>
            {'  Crawler Amazon Tool'}
            
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link onClick={() => {this.setState({page : 'crawler'})}}>Crawler</Nav.Link>
                <Nav.Link onClick={() => {this.setState({page : ''})}}>Lịch sử crawler</Nav.Link>
                
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" disabled />
               <Avatar width={40} height={40} src={`https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-1/p240x240/67560540_706872929750491_5200925105890263040_n.jpg?_nc_cat=101&_nc_oc=AQm3yn7VTZYD6ovICC0KsIA7dMpctpus1KPudkSxBOohMLhw8Ekkrl5B8hifsRXKFr0&_nc_ht=scontent.fsgn2-4.fna&oh=d96282ea6ad6f4090f81c5bb04786edf&oe=5E36E31A`}></Avatar>
                   <a href={'/'}> <FaSignOutAlt   className='logOut' style={{fontSize : 20, marginLeft : 10, color:'#FFFFFF',cursor : 'hand'}}></FaSignOutAlt></a>
                </Form>
            </Navbar.Collapse>
            </Navbar>
            
            <Crawler/>

         
            </div>
        )
    }
}
