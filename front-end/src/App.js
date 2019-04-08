import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route , Link} from "react-router-dom";
import Team from './Team'
import Admin from './Admin'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import socketIOClient from 'socket.io-client'
import io from 'socket.io-client'
const socket = io('10.130.60.5:8300')
function SimpleAppBar(props) {
  return (
    <div >
      <AppBar position="static" color= "None">
        <Toolbar>
        <Link style = {{"color" :"black", "textDecoration": "none"}}to="/">
          <Typography variant="h5" color="inherit">
           CheckMate
          </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
const HOME = ()=>{
  return(
    <div className = "optionsDiv">
    <div className = "optionsDiv2">
      <Link className = "Link" to="/Admin"> <div className = "HomeButton">ADMIN LOGIN </div></Link>
      <Link className = "Link" to="/Join"><div className = "HomeButton">JOIN COMPETITION </div></Link>
    </div>
    </div>
  )
}
class App extends Component {
  // componentDidMount(){
  //   socket.emit('message', "HELLO FRENDs")
  // }
  render() {
    return (
      <Router>
        {<SimpleAppBar/>}
        <switch>
          <Route path ="/admin" component = {Admin}/>
          <Route exact path ="/" component = {HOME} /> 
        </switch>
      </Router>
    );
  }
}

export default App;
