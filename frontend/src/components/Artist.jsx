import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import {Container, Row, Col, Button, ButtonGroup, ButtonToolbar, Image} from 'react-bootstrap';
import './Artist.css';

export default class Recommend extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            introduction: '',
            isToggle: true,
            data:{
                name: 'Tony',
                posts: 6,
                subscribers: 5,
                jobs: 5,
                introduction: `#愛神來臨 #脫魯神器 #單身怪自己
                【520愛神來臨】Paktor陪你一起脫魯
                一起找真愛：http://bit.ly/2Ju1LVk
                
                究竟面對不熟的女生，
                兩兄弟誰能夠勝出速成約會呢?
                
                肥宅也有機會出頭天
                就連宅男之王國動都可以成功跟女孩一起出去吃飯
                有絕佳面相優勢的你們還不來一起找真愛
                
                訂閱張家兄弟▻▻▻ https://goo.gl/o9qjGb
                訂閱蹦蛙娛樂▻▻▻ https://goo.gl/NNuxiG
                
                
                ▲準時滑起來　訂閱最油YouTuber頻道。▻https://goo.gl/o9qjGb
                ▲蹦蛙工作室　傻比的荒謬日常頻道。▻https://goo.gl/4u3MiT
                
                
                △【張家兄弟滑起來】共同開滑粉專在這裡。
                ▻https://goo.gl/Ruwzda
                △【亞洲統神-張嘉航】個人粉專在這裡。
                ▻https://goo.gl/diqxhp
                △【鼻地大師-張葦航】個人粉專在這裡。
                ▻https://goo.gl/Wjao9s
                △【日常的蹦蛙工作室日記IG】在這裡。
                ▻https://goo.gl/3ZaRJ1
                △【地表最強兄弟周邊產品】在蹦蛙村購買。
                ▻https://www.gg3be0.com/
                △【幫老哥老弟翻譯不同語言CC字幕】。
                ▻https://goo.gl/8MdrHx
                
                ．《大胃王系列影片》: https://goo.gl/gyrhXu
                ．《滑挑戰系列影片》: https://goo.gl/KYP3Qh
                ．《滑新聞系列影片》: https://goo.gl/7pGSqp
                ．《民生調查局系列》: https://goo.gl/EjBRpd
                
                
                ※找我們最重量級的頻道合作來信
                ▻thevoiceofgg3be0@gmail.com`,
                talentsId: 'adjfd-3l39d-dafd9-398fk-dsf84',
                photo: `images/React-icon.png`,
                comments: `good`
            }
        }
        this.toggleIntro = this.toggleIntro.bind(this);
    }

    componentDidMount(){
        this.toggleIntro();
    }

    render(){

        return(
            <div>
            <Container>
                <Row>
                    <Col sm={12} lg={12}>
                        <h1>Artist</h1>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} lg={6}>
                        <Image roundedCircle src={this.state.data.photo}/>
                        <h6>Name: {this.state.data.nama}</h6>
                        <span>posts: {this.state.data.posts} </span><span>subscribers: {this.state.data.subscribers} </span><span>jobs: {this.state.data.jobs} </span><br/>
                        <ButtonToolbar>
                            <Button variant='primary'>Subscribe</Button> 
                            <Button variant='success'>Contact</Button>
                        </ButtonToolbar>
                    </Col>
                    <Col sm={12} lg={6}>
                        {this.state.introduction}
                        <Button onClick={this.toggleIntro}>Load</Button>
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }

    toggleIntro(){
        console.log('toggleIntro')
        if(this.state.isToggle){
            this.setState({
                isToggle: false,
                introduction: this.state.data.introduction.split('\n').map((d, it) =>{
                    return(it < 10 ? <p key={it}>{d}</p> : '')
                })
            })
        }
        else {
            this.setState({
                isToggle: true,
                introduction: this.state.data.introduction.split('\n').map((d, it) =>{
                    return(<p key={it}>{d}</p>)
                })
            })
        }
    }
}