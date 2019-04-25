import React, { Component } from 'react';
import auth from "./Auth";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

function hold(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default class ParticipantLogin extends Component{
    constructor(props){
        super(props)
        this.state = {
            error : '',
            LogInTeamName : '',
            LogInJudgeName : '',
            LogInTeamPassword : '',
            LogInJudgePassword: '',
            LogInCompetitionName : '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showerr = this.showerr.bind(this);
    }
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value  })
    }
    showerr(e){
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
        switch(e.target.name){
            case 'LogInTeam':
                auth.login("Teams" , this.state.LogInCompetitionName ,this.state.LogInTeamName , this.state.LogInTeamPassword , ()=>{
                    this.props.history.push("/Team"); 
                } , this.showerr)
                document.getElementById(e.target.name).reset();
                break;
            case 'LogInJudge':
                auth.login("Judges" , this.state.LogInCompetitionName ,this.state.LogInJudgeName , this.state.LogInJudgePassword , ()=>{
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
                        this.props.history.push("/Judge"); 
                    })
                } , this.showerr)
                document.getElementById(e.target.name).reset();
                break;
            default:
                break;
        }
    }
    render(){
        return (
            <div>
                <center><h3>{this.state.error}</h3></center>
                <center><h1>Please Login First</h1></center>
              <div className = "LogInPage">
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div className = "NAMETAG"><h3>Team LogIn</h3></div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <form Name ="LogInTeam" id ="LogInTeam" onSubmit = {this.handleSubmit}>
                            <input className ="initialForm" Name = "LogInTeamName" placeholder ="Team Name" type = 'text' onChange={this.handleChange} required= "true"></input>
                            <input className ="initialForm" Name = "LogInTeamPassword" placeholder ="Password" type = 'password' onChange={this.handleChange} required= "true" ></input>
                            <input className ="initialForm" Name = "LogInCompetitionName" placeholder ="Competition Name" type = 'text' onChange={this.handleChange} required= "true"></input>
                            <input className ="initialFormSubmit" type = 'Submit' value = "LogIn"></input>
                        </form>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <br></br>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div className = "NAMETAG"><h3>Judge LogIn</h3></div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <form Name ="LogInJudge" id ="LogInJudge" onSubmit = {this.handleSubmit}>
                            <input className ="initialForm" Name = "LogInJudgeName" placeholder ="Team Name" type = 'text' onChange={this.handleChange} required= "true"></input>
                            <input className ="initialForm" Name = "LogInJudgePassword" placeholder ="Password" type = 'password' onChange={this.handleChange} required= "true" ></input>
                            <input className ="initialForm" Name = "LogInCompetitionName" placeholder ="Competition Name" type = 'text' onChange={this.handleChange} required= "true"></input>
                            <input className ="initialFormSubmit" type = 'Submit' value = "LogIn"></input>
                        </form>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </div>
          );
    }
}