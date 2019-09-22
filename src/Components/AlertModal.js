import React, { Component , useState } from 'react';
import loadingImg from './../Images/loadImageGif.gif'
import {Modal} from 'react-bootstrap';
import ReactLoading from 'react-loading';
export default function AlertModal(props) {
    
    
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" style={{color:'#FD5E1F'}}>
            Thông báo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>{props.msg} </span>
          <img src={loadingImg} width={250} height={150}></img>
            <div style={{width : '100%',marginTop:10,justifyContent:'center',alignItems:'center',display:'flex'}}>
           

            </div>
        </Modal.Body>
        <Modal.Footer>
       
        <button onClick={props.onHide} className='buttonStyle'> Đóng </button>
        </Modal.Footer>
      </Modal>
    );
  }