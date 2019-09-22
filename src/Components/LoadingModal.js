import React from 'react';
import loadingImg from './../Images/loadImageGif.gif'
import {Modal} from 'react-bootstrap';
import ReactLoading from 'react-loading';
export default function MyVerticallyCenteredModal(props) {
  
    
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" style={{color:'#FD5E1F'}}>
            Đang tiến hành Crawler
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Thời gian crawl khoảng 4s đến 10s  </span>
          <img src={loadingImg} width={250} height={150}></img>
            <div style={{width : '100%',marginTop:10,justifyContent:'center',alignItems:'center',display:'flex'}}>
            <ReactLoading type='spokes' color='#FD5E1F' height={30} width={30} />

            </div>
        </Modal.Body>
        <Modal.Footer>
       
        <button onClick={props.onHide} className='buttonStyle'> Đóng </button>
        </Modal.Footer>
      </Modal>
    );
  }