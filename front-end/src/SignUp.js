import React, { Component } from 'react';
import axios from 'axios';
import LINK from './link'
// import { Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
// import { Route, Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

function hold(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
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
            toast('SignUp Successful!', {
                className: css({
                    "margin-top":"16%",
                    "color" : "green",
                    fontSize: '210%',
                    fontFamily : 'Bree serif',
                    "text-align" : "center",
                    width: "130%",
                    height: "110px",
                    "border" : "2px solid white"

                }),
                // bodyClassName: css({
                //     fontSize: '60px'
                // }),
                // bodyClassName: "SuccessToast",
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                pauseOnHover: true,
                draggable: true
                });
                hold(2000)
                .then(()=>{
                    this.props.history.push("/LogIn");
                })
        })
        .catch(e=>{
        })
    }
    render(){
        return( 
            <div className = "DivWithBackground">
             <ToastContainer 
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange={false}
                    draggable
                    pauseOnHover
                />
            <Container  className = "AdminForm">
                    <form Name = "INITIALINFO" onSubmit = {this.handleSubmit}>
                        <input className ="initialForm" Name = "UserName" placeholder ="User Name" type = 'text' onChange={this.handleChange} required= "true"></input>
                        <input className ="initialForm" Name = "Password" placeholder ="Password" type = 'password' onChange={this.handleChange} required= "true"></input>
                        <input className ="initialForm" Name = "Email" placeholder ="Email Address" type = 'email' onChange={this.handleChange} required= "true"></input>
                        <input className ="initialFormSubmit" type = 'Submit' value = "Sign Up"></input>
                        <h6>Already have an account ? <a href="/LogIn">LogIn</a></h6>
                    </form>
            </Container>
        </div>
        )
    }
}