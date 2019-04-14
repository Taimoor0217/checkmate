import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Team from './Team'
import Admin from './Admin'
import Judge from './Judge'
import { ProtectedRoute } from "./ProtectedRoute";
import socketIOClient from 'socket.io-client'
import io from 'socket.io-client'
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import auth from "./Auth";
import ParticipantLogin from './ParticipantLogin'

const socket = io('10.130.60.5:8300')
function SimpleAppBar(props) {
  return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Brand className = 'NavBrand ' href="/">Check Mate</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {/* <Nav.Link href="/SignUp">SignUp</Nav.Link> */}
            </Nav>
            <Nav className = 'NavElem'>
              <Nav.Link href="/pricing">Pricing</Nav.Link>
              <Nav.Link href="/AboutUs">About</Nav.Link>
              <Nav.Link href="/ContactUs">Contact Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
  );
}
const HOME = ()=>{
  return(
    <div className = "DivWithBackground" >
      <Container className = "optionsDiv">
        <Button className= "HomeButton" variant="secondary" size="lg" href="/Admin" block>
          Create Competition
        </Button>
        <Button className= "HomeButton" variant="secondary" size="lg" href="/ParticipantLogin" block>
          Join Competition
          </Button>
      </Container>
      {/* <Link className = "Link" to="/Join"><div className = "HomeButton">JOIN COMPETITION </div></Link> */}
    </div>
  )
}
class App extends Component {
  render() {
    return (
      <Router>
        {<SimpleAppBar/>}
        <switch>
          <Route path ="/admin" component = {Admin}/>
          <Route path ="/ParticipantLogin" component = {ParticipantLogin}/>
          <Route exact path ="/" component = {HOME} />
          <ProtectedRoute exact path="/Judge" component={Judge}/>
          <ProtectedRoute exact path="/Team" component={Team}/>
        </switch>
      </Router>
    );
  }
}

export default App;
