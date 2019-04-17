import React, { Component } from 'react';
import axios from 'axios';
import LINK from './link'
import { Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Route, Redirect } from "react-router-dom";
export default class SignUp extends Component{
    constructor(props){
        super(props)
        this.state = {
            UserName : '',
            Password : '',
            Email : ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e){
        this.setState({[e.target.name] : e.target.value  })
    }
    handleSubmit(e){
        e.preventDefault()
        // console.log(this.state)
        axios.post(LINK+'SignUp',{
            UserName: this.state.UserName,
            Password: this.state.Password,
            EmailID : this.state.Email,
            CompetitionID: ''
        })
        .then(d=>{
            this.props.history.push("/LogIn");
        })
        .catch(e=>{
        })
    }
    render(){
        return( 
            <div className = "DivWithBackground">
            <Container  className = "AdminForm">
                    <form Name = "INITIALINFO" onSubmit = {this.handleSubmit}>
                        <input className ="initialForm" Name = "UserName" placeholder ="User Name" type = 'text' onChange={this.handleChange} required= "true"></input>
                        <input className ="initialForm" Name = "Password" placeholder ="Password" type = 'text' onChange={this.handleChange} required= "true"></input>
                        <input className ="initialForm" Name = "Email" placeholder ="Email Address" type = 'email' onChange={this.handleChange} required= "true"></input>
                        <input className ="initialFormSubmit" type = 'Submit' value = "Sign Up"></input>
                        <h6>Already have an account ? <a href="/LogIn">LogIn</a></h6>
                    </form>
            </Container>
        </div>
        )
    }
}