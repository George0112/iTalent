import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import {Col, Row, Image} from 'react-bootstrap';

import PostModal from 'components/PostModal.jsx';

import {get, post} from '../api/post.js';

export default class Post extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isModalShow: false,
            artistId: '',
            postData: {
                title: '',
                detail: ''
            }
        }
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    componentDidMount(){
        get('api/post/detail', {id: this.props.postId})
        .then(data => {
            this.setState({postData: data[0]});
        })
        .catch(e => {
            console.log(e);
        })
    }

    render(){

        const opts = {
            height: '360',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 0
            }
        };

        return(
            <Col>
                <Row onClick={this.openModal}>
                    <Image style={{width:'30%', height: '100%', display: 'inline', borderRadius: "10px", border: "3px solid #eee", marginRight: "0.5rem"}} src={`images/guitar.jpg`}/>
                    <p><span>Title: {this.state.postData.title} </span></p>
                    <p><span>Introduction: {this.state.postData.detail}</span></p>
                </Row>
                <PostModal onHide={this.closeModal} show={this.state.isModalShow} userId={this.props.userId} postData={this.state.postData}/>
            </Col>
        )
    }

    openModal(){
        this.setState({isModalShow: true});
    }

    closeModal(e){
        if(e)
            e.stopPropagation();
        this.setState({isModalShow: false})
    }
}
