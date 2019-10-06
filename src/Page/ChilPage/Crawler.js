import React, { Component } from 'react';
import { Container, Col,Row,Card,ListGroup } from 'react-bootstrap';
import './../../css/managerPage.css';
import MyVerticallyCenteredModal from './../../Components/LoadingModal'
import BASE_URL from './../../util/globalVar'
import { FaAmazon,FaSpider,FaPenNib,FaCalendarCheck,FaCubes,FaFeatherAlt,FaImage,FaArrowAltCircleRight,FaExchangeAlt } from 'react-icons/fa';
import Axios from 'axios';
import Alert from './../../Components/Alert';
import AlertModal from './../../Components/AlertModal'
import ReactLoading from 'react-loading';
import Modal from 'react-responsive-modal';
import { asArray } from 'builder-util';
import { async } from 'q';

class Crawler extends Component {
    state = {
        keyword : '',
        page : 1,
        modalShow : false,
        listData : [],
        suggestions : [],
        open : false,
        msg : '',
        isLoading : false,
        date : '',
        oldString : '',
        newString : '',
        modalShowAlert : false,
        msgModal : '',
        listDataCrawler : [],
        listDataNewName : [],
        listDataOldName : [],
        keywordArray : '',
        listGetTay : ''
 
    }
    _renderLoadingBar = () => {
        return this.state.isLoading === true ? <ReactLoading type='spin' color='#FD5E1F' height={30} width={30} /> : '';
    }

    _onCrawlerArray = async () => {
        const ArrayLink = this.state.keywordArray.split("\n");
        
        console.log(this.state.keyword + ' : ' + this.state.page)
        this.setState({
            modalShow : true
        })

        const crawlData = await Axios.post(`${BASE_URL}/api/crawlDataAmazon/getDataInAmazonCustom`,{
            array3 : ArrayLink
        });
        

        console.log(crawlData);  
      
        if(crawlData.data.status === 200)
        {
            this.setState({
                listDataCrawler : crawlData.data.data.filter((value) => {
                    return value; 
                })
            })

            this.setState({
                listDataOldName : this.state.listDataCrawler
            })

            this.setState({
                listData : this.state.listDataCrawler
            })

         

           
            
            this.setState({
                modalShow : false
            })
            
        }else if(crawlData.data.status === 204) {
            this.setState({
                modalShow : false
            })
            this.setState({
                modalShowAlert : true,
                msgModal : crawlData.data.msg
            })
           
        }
    }


    _renderAlert = () => {
        return this.state.msg !== '' ? <Alert color='red' msg={this.state.msg} size={13}></Alert> : '';
    }
    onOpenModal = () => {
        this.setState({ open: true });
      };
     
      onCloseModal = () => {
        this.setState({ open: false });
      };
    async _downloadAllImage() {
        if(this.state.listData.length !== 0)
        {
            const DownloadImage = await Axios.post(`${BASE_URL}/api/crawlDataAmazon/DowloadImg`,{
                    listData: this.state.listDataOldName
            })
            const DownloadImageSS = await Axios.post(`${BASE_URL}/api/crawlDataAmazon/DowloadImgChangeName`,{
                listData: this.state.listDataNewName
            })
       
            if(DownloadImage.data.status === 200)
            {
                this.setState({
                    modalShowAlert : true,
                    msgModal : 'Download thành công vui lòng kiểm tra file download'
                })
              
            }
            else if(DownloadImage.data.status === 204)
            {
                this.setState({
                    modalShowAlert : true,
                    msgModal : 'Lỗi kết nối vui lòng thử lại'
                })
               
            }
        }else {
            this.setState({
                modalShowAlert : true,
                msgModal : 'Chưa có ảnh để tải vui lòng crawl dữ liệu về'
            })
            
        }
    }
    
    _onCrawler = async () => {
        console.log(this.state.keyword + ' : ' + this.state.page)
        this.setState({
            modalShow : true
        })

        const crawlData = await Axios.get(`${BASE_URL}/api/crawlDataAmazon/getDataInAmazon?keyword=${this.state.keyword}&page=${this.state.page}`);
        const crawSuggestKeyword = await Axios.get(`https://completion.amazon.com/api/2017/suggestions?mid=ATVPDKIKX0DER&alias=aps&prefix=${this.state.keyword}`);

        console.log(crawSuggestKeyword);
       console.log(crawlData);
       if(crawSuggestKeyword.status === 200)
       {
           this.setState({
               suggestions : crawSuggestKeyword.data.suggestions
           })
       }
        if(crawlData.data.status === 200)
        {
            this.setState({
                listDataCrawler : crawlData.data.data.filter((value) => {
                    return ((value.rank >= 10000 && value.rank <= 1500000) || value.rank == ''); 
                })
            })

            this.setState({
                listData : this.state.listDataCrawler
            })

            this.setState({
                listDataOldName : this.state.listData
            })
            
           
            const crawlData2 = await Axios.get(`${BASE_URL}/api/crawlDataAmazon/getDataInAmazon?keyword=${this.state.keyword}&page=${this.state.page+1}`);
            if(crawlData2.data.status === 200)
        {
            this.setState({
                listDataCrawler : this.state.listDataCrawler.concat(crawlData2.data.data.filter((value) => {
                    return ((value.rank >= 10000 && value.rank <= 1500000) || value.rank == ''); 
                }))
            })

            this.setState({
                listData : this.state.listData.concat(this.state.listDataCrawler)
            })

            this.setState({
                listDataOldName : this.state.listDataOldName.concat(this.state.listData)
            })
            
            this.setState({
                modalShow : false
            })
        }
            
        }else if(crawlData.data.status === 204) {
            this.setState({
                modalShow : false
            })
            this.setState({
                modalShowAlert : true,
                msgModal : crawlData.data.msg
            })
           
        }
    }
    _renderDataCrawler = () => {
        return this.state.listData.map((value,index) => {
             return(
            <Col xs={3}>
                                    <Card className="Card-product" style={{ width: '100%' }}>
                                    <Card.Img variant="top" src={value.image} />
                                    <Card.Body>
                                        <Card.Title  className='text'>{value.name}</Card.Title>
                                        <Card.Text className='text'>Key : {index}</Card.Text>
                                        <Card.Text  className='text'>
                                            <span>Rank : <span style={{color : '#ab000d',fontWeight:'bold'}}>{value.rank}</span></span> <br/>
                                            <span>Ngày đăng :  <span style={{color : '#303f9f',fontWeight:'bold'}}> {value.date}</span></span>
                                        </Card.Text>

                                        <Card.Text className='text'>
                                            
                                        </Card.Text>
                                       
                                    </Card.Body>
                                    </Card>
                                    </Col>)
        })
    }

    _renderKeyword = () => {
        return this.state.suggestions.map((value) => {
            return (
               
                <ListGroup.Item>{value.value}</ListGroup.Item>
                
            )
        })
    }

    _changeString =  () => {
        this.setState({
            listDataNewName : this.state.listDataCrawler.filter((value) =>{
                // console.log(value.name.indexOf(this.state.oldString));
                // console.log(this.state.oldString);
                // console.log(value.name)
               return value.name.indexOf(this.state.oldString) != -1 ? value : '';
            })
        })
        this.setState({
            listDataOldName : this.state.listDataCrawler.filter((value) =>{
                // console.log(value.name.indexOf(this.state.oldString));
                // console.log(this.state.oldString);
                // console.log(value.name)
               return value.name.indexOf(this.state.oldString) == -1 ? value : '';
            })
        })
         this.setState({
            listData : this.state.listDataCrawler.map((value) =>{
                let newString = value.name.replace(this.state.oldString,this.state.newString);
                value.name = newString;
                return value;
            })
        })
        
        this.setState({
            modalShowAlert : true,
            msgModal : 'Đổi chuỗi thành công'
        })
        console.log(this.state.listDataNewName)
        


    }

    _filterDate = () => {
        if(this.state.date === '')
        {
            this.setState({
                listData : this.state.listDataCrawler
            })
        }
        else {
        this.setState({
            listData : this.state.listDataCrawler.filter((value) => {
                return this.state.date == value.date;
            })
        })
    }
    }

    render() {
        return (
            <div style={{}}>
                <Container fluid={true} style={{height : '100%'}} >
                    <Row style={{height : '100%'}}>
                        <Col xs={4} style={{}}>
                            <Container>
                                <Row style={{marginTop : 30}}>
                                    <Col xs={12}>
                                        <span style={{fontFamily : 'Roboto',fontWeight:'lighter', marginBottom : 20}}><FaFeatherAlt/> Crawler Search</span>
                                    </Col>
                                </Row>
                                <Row style={{marginTop : 5}}>
                                    <Col xs={12}>
                                        <input placeholder={'Nhập từ khóa để crawl'} onChange={(e) => {this.setState({keyword : e.target.value})}} className='inputStyle'/> 
                                       
                                    </Col>
                                    
                                </Row>
                                
                                <Row style={{marginTop : 5}}>
                                    <Col xs={12}>
                                    <button onClick={() => {this._onCrawler()}} className='buttonStyle'><FaSpider style={{fontSize : 20}}/> Bắt đầu crawl</button>
                                    </Col>
                                </Row>
                                <Row style={{marginTop : 30}}>
                                    <Col xs={12}>
                                        <span style={{fontFamily : 'Roboto',fontWeight:'lighter', marginBottom : 20}}><FaFeatherAlt/> Nhập link png gốc</span>
                                    </Col>
                                </Row>
                                <Row style={{marginTop : 5}}>
                                    <Col xs={12}>
                                        <textarea rows="4" cols="50" placeholder={'Nhập link để get png'} onChange={(e) => {this.setState({keywordArray : e.target.value})}} className='inputStyle'/> 
                                       
                                    </Col>
                                    
                                </Row>
                                <Row style={{marginTop : 5}}>
                                    <Col xs={12}>
                                    <button onClick={() => {this._onCrawlerArray()}} className='buttonStyle'><FaSpider style={{fontSize : 20}}/> Bắt đầu get png</button>
                                    </Col>
                                </Row>
                                <Row style={{marginTop : 15}}>
                                    <Col xs={12}>
                                    <span style={{fontFamily : 'Roboto',fontWeight:'lighter', marginBottom : 20}}><FaAmazon/> Keywords hot</span>
                                    </Col>
                                    <Col xs={12}>
                                    {this._renderKeyword()}
                                    </Col>
                                </Row>

                                
                                
                            </Container>
                        </Col>
                        <Col xs={8}>
                        <Container>
                                <Row style={{marginTop : 30}}>
                                    <Col xs={12}>
                                        <span style={{fontFamily : 'Roboto',fontWeight:'lighter', marginBottom : 20}}><FaCubes/> Results Data</span>
                                    </Col>
                                </Row>
                                <Row style={{marginTop : 5}}>
                                <Col xs={9}></Col>
                                    <Col xs={3}>
                                    <spna> <FaExchangeAlt/> Chọn trang</spna>
                                    </Col>
                                    <Col xs={3}>
                                    <button onClick={() => {this._downloadAllImage()}} className='buttonStyle' style={{backgroundColor:'#673ab7'}}><FaImage style={{fontSize : 20}}/> Download All</button>
                                    </Col>
                                    <Col xs={3}>
                                    <button onClick={() => {this.onOpenModal()}} className='buttonStyle'><FaPenNib/> Đổi tên png</button>
                                    </Col>
                                    <Col xs={3}>
                                    <input type='text'  onChange={(e) => {this.setState({date : e.target.value})}} placeholder='Nhập ngày' max={1000} style={{width:80,height:40}}/>
                                    <button onClick={() => {this._filterDate()}} className='buttonStyle-2'><FaCalendarCheck/></button>
                                    </Col>
                                    <Col xs={3}>
                                    <input type='number' min={1} onChange={(e) => {this.setState({page : e.target.value})}} defaultValue={this.state.page} max={1000} style={{width:40,height:40}}/>
                                    <button onClick={() => {}} className='buttonStyle-2'><FaArrowAltCircleRight/></button>
                                    </Col>
                                    
                                    
                                </Row>
                                <Row style={{marginTop : 5}}>
                                    {this._renderDataCrawler()}
                                </Row>
                            </Container>    

                        </Col>
                        
                    </Row>
                </Container>
                <MyVerticallyCenteredModal
                    show={this.state.modalShow}
                    onHide={() => {this.setState({modalShow : false})}}
                />
                <AlertModal
                     show={this.state.modalShowAlert}
                     onHide={() => {this.setState({modalShowAlert : false})}}
                     msg={this.state.msgModal}
                ></AlertModal>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                        <Container>
                            <Row>
                                <Col>
                                    <h5 style={{color : '#FD5E1F'}}>Thay thế chuỗi</h5>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} style={{marginTop : 10,marginBottom:5}}>
                                    <span>Chuỗi ban đầu</span>
                                </Col>
                                <Col xs={12}>
                                <input placeholder={'Nhập chuỗi ban đầu'} onChange={(e) => {this.setState({oldString : e.target.value})}} className='inputStyle'/> 
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} style={{marginTop : 10,marginBottom:5}}>
                                    <span>Chuỗi mới</span>
                                </Col>
                                <Col xs={12}>
                                <input placeholder={'Nhập chuỗi mới'} type="text" onChange={(e) => {this.setState({newString : e.target.value})}} className='inputStyle'/> 
                                </Col>
                            </Row>

                            <Row style={{marginTop : 15,marginBottom:5}}>
                                <Col xs={12}>
                                <button onClick={() => {this._changeString()}} className='buttonStyle'>Đổi ký tự</button>
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
                </Modal>
            </div>
        );
    }
}

export default Crawler;