import React, { Component } from 'react';
import axios from 'axios'
import LINK from './link'
import io from 'socket.io-client'
import { Button } from 'react-bootstrap';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
export default class Team extends Component{
    constructor(props){
        super(props)
        this.state = {
            Problems : [],
            SubmittedFile : '',
            Started : false
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.SetStatus = this.SetStatus.bind(this)
        this.openScoreBoard = this.openScoreBoard.bind(this)
    }
    openScoreBoard(){
        window.open(`http://check-mate.ml/Scoreboard/${this.props.CompName}`)
    }
    componentDidMount(){
        axios.get(LINK+ 'TeamProblems', {
            params:{
                Competition : this.props.CompName,
                TeamName : this.props.Name
            }
        })
        .then(d=>{
            // console.log(d.data)
            this.setState({
                Problems: d.data.Problems,
                Started : d.data.Started
            })
        })
        .catch(e=>{
            console.log(e)
        })
        const socket = io(LINK)
        socket.on('UpdateStatus', d =>{
            if(d.Team === this.props.Name && d.Competition === this.props.CompName){
                this.SetStatus(d.Problem , d.status)
            }
        })
        socket.on('ToggleCompStatus' , d =>{
            this.setState({Started : !this.state.Started})
        })
    }
    handleChange(e){
        this.setState({ [e.target.name] : e.target.files[0] })
    }
    SetStatus(target, status) {
        var temp = this.state.Problems
        for( var i = 0 ; i < temp.length ; i++){
            if(temp[i].Name === target){
                temp[i].Status = status
            }
        }
        this.setState({Problems:temp})
    }
    handleSubmit(event){
        event.preventDefault()
        const PROBNAME = event.target.id
        this.SetStatus(PROBNAME , "Pending")
        let formDataInput = new FormData();
        formDataInput.append('Competition', this.props.CompName);
        formDataInput.append('Team', this.props.Name);
        formDataInput.append('SubmittedFile', this.state.SubmittedFile);
        formDataInput.append('Problem' , PROBNAME)
        axios.post(LINK + 'ProbSolution' , formDataInput)
        .then(d =>{
            if(d.data.error){
                if(d.data.error === "Time Limit Exceeded"){
                    this.SetStatus(PROBNAME, "TLE" )
                }else{
                    this.SetStatus(PROBNAME, "ERR" )
                }
            }else{
                if(d.data.result === "Correct"){
                    this.SetStatus(PROBNAME, "Solved" )
                }else{
                    this.SetStatus(PROBNAME, "Incorrect" )
                }
            }
        })
        .catch(e => console.log(e))
        // const id = event.target.id
        // setTimeout(()=>this.SetStatus(id , "Solved") , 4000)
    }
    render(){
        const flag = this.state.Started
        return( 
        <div>
            <center>
                <div className = "CompDashboard"><h2>{this.props.Name}, Welcome to {this.props.CompName}</h2></div>
                <br></br>
            </center>
            <Button className= "ScoreboardButton" variant="secondary" onClick = {this.openScoreBoard}> Scoreboard</Button>
            <div>
                {flag ? (
                    this.state.Problems.map(p =>{
                    return(
                        <div className = "TeamProblem">
                            <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <div className = "ProblemStatement" ><h3>{p.Name}</h3></div>
                            <div className = "ProblemStatus" >
                                <h5 className = {p.Status}>{p.Status}</h5>
                            </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <form id ={p.Name} className = "ProblemSubmit" onSubmit = {this.handleSubmit}>
                                    <input Name = "SubmittedFile" type = 'file' required= "true" onChange = {this.handleChange} ></input>
                                    <input type = 'Submit' value = "Submit"></input>
                                </form>
                            </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    )
                }
                )):(
                    <div className = "Waiting">
                        <h3>Waiting for Competition to Start...</h3>
                    </div>
                )}
            </div>
        </div>
        )
    }
}