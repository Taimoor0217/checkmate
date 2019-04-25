import React, { Component } from 'react';
import auth from "./Auth";
import { Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

function hold(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default class LogIn extends Component{
    constructor(props){
        super(props)
        this.state = {
            error : '',
            UserName : '',
            Password : '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showerr = this.showerr.bind(this);
    }
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value  })
    }
    showerr(e){
        // this.setState({error : e})
        toast('Invalid Credentials', {
            className: css({
                "margin-top":"16%",
                "color" : "red",
                // background: 'rgba(255, 12, 3, 0.94);',
                fontSize: '210%',
                fontFamily : 'Bree serif',
                "text-align" : "center",
                width: "130%",
                height: "110px",
                "border" : "2px solid white"

            }),
            bodyClassName: css({
                fontSize: '60px'
            }),
            bodyClassName: "SuccessToast",
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            pauseOnHover: true,
            draggable: true
        })
    }
    handleSubmit(e){
        e.preventDefault()
            auth.loginAdmin(this.state.UserName , this.state.Password , ()=>{
                toast('LogIn Successful!', {
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
                    bodyClassName: css({
                        fontSize: '60px'
                    }),
                    bodyClassName: "SuccessToast",
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    pauseOnHover: true,
                    draggable: true
                    });
                hold(2000)
                .then(()=>{
                    this.props.history.push("/admin"); 
                })
            } , this.showerr)
            document.getElementById(e.target.name).reset();
    }
    render(){
        return (
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
                    <center><h3>{this.state.error}</h3></center>
                    <center><h1>Please Login To Continue</h1></center>
                    <div className = "LogInPage">
                        <form Name ="LogIn" id ="LogIn" onSubmit = {this.handleSubmit}>
                            <input className ="initialForm"  Name = "UserName" placeholder ="UserName" type = 'text' onChange={this.handleChange} required= "true"></input>
                            <input className ="initialForm" Name = "Password" placeholder ="Password" type = 'password' onChange={this.handleChange} required= "true" ></input>
                            <br></br>
                            <input className ="initialFormSubmit" type = 'Submit' value = "LogIn"></input>
                            <h6>Do not have an Account? <a href="/SignUp">SignUp</a></h6>
                        </form>
                    </div>
                </Container>
                </div>
          );
    }
}