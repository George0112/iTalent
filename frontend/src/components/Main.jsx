import React from 'react';

import SignInWithGoogle from './SignInWithGoogle.jsx';
import OAuthButton from './OAuthButton.jsx';
import {withAuthenticator, Authenticator} from 'aws-amplify-react';
import Amplify, {Auth, Hub} from 'aws-amplify';
import awsmobile from '../aws-exports';

Amplify.configure(awsmobile);

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown} from 'react-bootstrap';
import Button from 'react-bootstrap/Button'

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

import {getUserData} from '../api/user.js';
import {postMoney,getMoney} from 'api/post.js'
import Today from 'components/Today.jsx';

import Wellcome from 'components/Wellcome.jsx';
import Artist from 'components/Artist.jsx';
import Login from 'components/Login.jsx';
import Account from 'components/Account.jsx';
import PostForm from 'components/PostForm.jsx';
import PostModal from 'components/PostModal.jsx';
import Store from 'components/Store.jsx';
import './Main.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            unit: 'metric',
            navbarToggle: false,
            dropdownOpen: false,
            isModalShow: false,
            money: 0,
            userData: null

        };
        this.toggle = this.toggle.bind(this);

        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.updateMoney = this.updateMoney.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.test = this.test.bind(this);
        if(this.props.authState == "signedIn"){
            this.getUserData(this.props.authData.attributes.sub);
        }
    }


    render() {
        return (
            <Router>
                <div className={`main bg-faded ${this.state.group}`}>
                    <div className='container'>

                        <Navbar color="faded" light toggleable>
                            <NavbarBrand className='text-info' href="/">iTalents</NavbarBrand>
                                <Nav navbar style={{display: "flex", flexDirection: "row"}}>
                                    <NavItem>
                                    
                                    </NavItem>
                                    <NavItem>
                                        <Button onClick={this.openModal}>儲值
                                             <Store triggerchangemoney={this.updateMoney} onHide={this.closeModal} show={this.state.isModalShow}/>

                                        </Button>
                                    </NavItem>
                                    <NavItem style={{marginLeft: "10px"}}>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                          Category
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                          <Dropdown.Item href="#/action-1">音樂</Dropdown.Item>
                                          <Dropdown.Item href="#/action-2">運動</Dropdown.Item>
                                          <Dropdown.Item href="#/action-3">學業</Dropdown.Item>
                                          <Dropdown.Item href="#/action-3">主持</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink left onClick={this.handleNavbarToggle} tag={Link} to='/artist'>Artist</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink left onClick={this.handleNavbarToggle} tag={Link} to='/account'>Account</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink left onClick={this.handleNavbarToggle} tag={Link} to='/upload'>Upload</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink left onClick={this.handleNavbarToggle} tag={Link} to='/'>
                                          <img src="images/coins.png" style={{width: "20px", marginRight: "10px"}}></img>
                                          <span>餘額 ： {this.state.money} 元</span>

                                          </NavLink>
                                    </NavItem>
                                </Nav>
                        </Navbar>
                    </div>

                    <Route exact path="/" render={() => (
                        <Wellcome userid={this.props.userid}/>
                    )}/>
                    <Route exact path="/artist" render={() => (
                        <Artist userid={this.props.userid}/>
                    )}/>
                    <Route exact path="/account" render={() => (
                        <Account userid={this.props.userid}/>
                    )}/>
                    <Route exact path="/upload" render={() => (
                        <PostForm userid={this.props.userid}/>
                    )}/>
                </div>
            </Router>
        );
    }
    test()
    {
      var money=0;
      getMoney('allen').then(res=>{
        money=res.data[0].money;
        //console.dir(money,'moneyyy');
      }).then(res=>{
        //console.log('enter');
        this.setState({
          money:money
        })
        console.log(this.state.money);
      }).catch(e => {
          console.log(e);
          alert('fail');
      });;

    }
    updateMoney(cash)
    {
      this.setState({money:this.state.money+Number(cash)});
      console.log(typeof(this.state.money));
      postMoney('henry',300);

    }
    openModal(){
        this.setState({isModalShow: true});

        //console.log('openModal', this.state.isModalShow)
    }
    closeModal(e){
        e.stopPropagation();
        this.setState({isModalShow: false})
    }
    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }
    handleNavbarToggle() {
        this.setState((prevState, props) => ({
            navbarToggle: !prevState.navbarToggle
        }));
    }

    getUserData(id){
        getUserData(id)
        .then(data => {console.log(data)})
        .catch(e => {console.log(e)});
    }
}

export default withAuthenticator(Main, {
    // Render a sign out button once logged in
    includeGreetings: true,
    // Show only certain components
    // authenticatorComponents: [MyComponents],
    // display federation/social provider buttons
    // federated: { myFederatedConfig },
    // customize the UI/styling
    // theme: { myCustomTheme }
});


// export default Main;
