import React, { Component } from 'react';
import auth from "./Auth";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value  })
    }
    handleSubmit(e){
        e.preventDefault()
        switch(e.target.name){
            case 'LogInTeam':
                auth.login("Team" , this.state.LogInCompetitionName ,this.state.LogInTeamName , this.state.LogInTeamPassword , ()=>{
                    this.props.history.push("/Team"); 
                } , ()=>this.setState({error : "InValid UserName/Password"}))
                document.getElementById(e.target.name).reset();
                break;
            case 'LogInJudge':
                auth.login("Judge" , this.state.LogInCompetitionName ,this.state.LogInJudgeName , this.state.LogInJudgePassword , ()=>{
                    this.props.history.push("/Judge"); 
                } , ()=>this.setState({error : "InValid UserName/Password"}))
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
                            <input Name = "LogInTeamName" placeholder ="Team Name" type = 'text' onChange={this.handleChange} required= "true"></input>
                            <input Name = "LogInTeamPassword" placeholder ="Password" type = 'password' onChange={this.handleChange} required= "true" ></input>
                            <input Name = "LogInCompetitionName" placeholder ="Competition Name" type = 'text' onChange={this.handleChange} required= "true"></input>
                            <input type = 'Submit' value = "LogIn"></input>
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
                            <input Name = "LogInJudgeName" placeholder ="Team Name" type = 'text' onChange={this.handleChange} required= "true"></input>
                            <input Name = "LogInJudgePassword" placeholder ="Password" type = 'password' onChange={this.handleChange} required= "true" ></input>
                            <input Name = "LogInCompetitionName" placeholder ="Competition Name" type = 'text' onChange={this.handleChange} required= "true"></input>
                            <input type = 'Submit' value = "LogIn"></input>
                        </form>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </div>
          );
    }
}