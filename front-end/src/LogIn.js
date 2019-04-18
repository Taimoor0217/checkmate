import React, { Component } from 'react';
import auth from "./Auth";
import { Container } from 'react-bootstrap';
// import { Nav } from 'react-bootstrap';


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
        this.setState({error : e})
    }
    handleSubmit(e){
        e.preventDefault()
            auth.loginAdmin(this.state.UserName , this.state.Password , ()=>{
                this.props.history.push("/admin"); 
            } , this.showerr)
            document.getElementById(e.target.name).reset();
    }
    render(){
        return (
            <div className = "DivWithBackground">
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