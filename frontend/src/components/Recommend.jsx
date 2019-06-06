import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import axios from 'axios';
import {Card, CardDeck , Container, Row, Col, CardColumns, Button}from 'react-bootstrap';
import './Recommend.css';
import {newPost,getHot} from 'api/post.js';
import PostModal from 'components/PostModal.jsx';
export default class Recommend extends React.Component{

    constructor(props){
        super(props);

        this.state={
            isModalShow: false,
            Title:[],
            category:[],
            ts:[],
            by_hour:[],
            price:[],
            experience:[],
            dataAllocate:[],
            datas:[]
        }

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.addCollection = this.addCollection.bind(this);


    }



    render(){
      var titles=[]
      var categorys=[]
      var data=[]
      let cards
      getHot().then(res=>{

        res.data.forEach((data)=>{

          titles.push(data.title);
          categorys.push(data.category);

        })
        for(var i=0;i<titles.length;i++)
        {
          data.push({
            img: `images/guitar.jpg`,
            text:titles[i],
            category:categorys[i]
          })
        }

      }).then(res=>{
           this.setState({
             datas:data
           })
        })
      cards = this.state.datas.map(d => {
           return (

           <Card onClick={this.openModal} key={d.key} style={{minWidth: '200px'}}>
               <Card.Img className="carding" style={{width:'150px',height:'150px',borderRadius:'50%',marginLeft:'22px',marginTop:'10px',border:'solid 5px #eee'}} variant="top" src={d.img}/>
               <Card.Body style={{textAlign: 'center'}}>
                     <Card.Title >{this.props.name}</Card.Title>
                     <Card.Text>{d.text}</Card.Text>
                     <Button onClick={this.addCollection}>add</Button>
               </Card.Body>
              <PostModal onHide={this.closeModal} show={this.state.isModalShow}/>
           </Card>)
       });
      return(
      <div>
          <h1 className="title">{this.props.title}</h1>
          <Row className='justify-content-md-center scrollbar' style={{margin: "50px 80px"}}>
              <CardDeck style={{flexFlow: "row nowrap", margin: "10px 0"}}>
                  {cards}
             </CardDeck>
          </Row>
      </div>
      );

    }
    addCollection(){
        console.log('add');
    }
    openModal(){
        this.setState({isModalShow: true});
    }

    closeModal(e){
        e.stopPropagation();
        this.setState({isModalShow: false})
    }
}
