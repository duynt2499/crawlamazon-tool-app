import React, { Component } from 'react';
import { Container, Col,Row,Card,ListGroup,ListGroupItem } from 'react-bootstrap';
import './../../css/managerPage.css';
import MyVerticallyCenteredModal from './../../Components/LoadingModal'
import BASE_URL from './../../util/globalVar'
import { FaAmazon,FaSpider,FaCubes,FaFeatherAlt,FaImage,FaArrowAltCircleRight,FaExchangeAlt } from 'react-icons/fa';
import Axios from 'axios';
class Crawler extends Component {
    state = {
        keyword : '',
        page : 1,
        modalShow : false,
        listData : [],
        suggestions : []

    }
    async _downloadAllImage() {
        if(this.state.listData.length !== 0)
        {
            const DownloadImage = await Axios.post(`${BASE_URL}/api/crawlDataAmazon/DowloadImg`,{
                    listData: this.state.listData
            })
            if(DownloadImage.data.status === 200)
            {
                alert('Download thành công vui lòng kiểm tra file download');
            }
            else if(DownloadImage.data.status === 204)
            {
                alert('Lỗi kết nối vui lòng thử lại')
            }
        }else {
            alert('Chưa có ảnh để tải');
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
                listData : crawlData.data.data
            })
            
            this.setState({
                modalShow : false
            })
        }else if(crawlData.data.status === 204) {
            this.setState({
                modalShow : false
            })
            alert(crawlData.data.msg)
        }
    }
    _renderDataCrawler = () => {
        return this.state.listData.map((value) => {
             return(
            <Col xs={3}>
                                    <Card className="Card-product" style={{ width: '100%' }}>
                                    <Card.Img variant="top" src={value.image} />
                                    <Card.Body>
                                        <Card.Title  className='text'>{value.name}</Card.Title>
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
                                    <Col xs={6}>
                                        
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
            </div>
        );
    }
}

export default Crawler;