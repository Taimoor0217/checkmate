import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client'
import LINK from './link'
import { Button , ButtonToolbar } from 'react-bootstrap';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
export default class Judge extends Component{
    constructor(props){
        super(props)
        this.state = {
            Name : props.Name,
            Submissions : []
        }
        this.fetchSubmissions = this.fetchSubmissions.bind(this)
        this.SetStatus = this.SetStatus.bind(this)
        this.Compare = this.Compare.bind(this)
        this.Accept = this.Accept.bind(this)
        this.Reject = this.Reject.bind(this)
    }
    fetchSubmissions(){
        axios.get(LINK + 'getSubmissions' , {
            params:{
                Competition : this.props.CompName
            }
        })
        .then(d=>{
            // console.log(d.data)
            this.setState({Submissions : d.data})
        })
        .catch(e => console.log(e))
    }
    componentWillMount(){
        this.fetchSubmissions()
    }
    componentDidMount(){
        const socket = io(LINK)
        socket.on('NewSubmission', d =>{
            let subs = this.state.Submissions
            subs.push(d)
            this.setState({Submissions: subs})
            // console.log(d)
        })
    }
    SetStatus(target, status) {
        var temp = this.state.Submissions
        for( var i = 0 ; i < temp.length ; i++){
            if(temp[i].SubmissionID === target){
                temp[i].Status = status
            }
        }
        this.setState({Submissions:temp})
    }
    RunRequest(e){
        e.preventDefault()
        const Id = e.target.id
        console.log(Id)
        this.SetStatus(Id , "Pending")
        axios.get(LINK + 'runSubmission' , {
            params :{
                Competition : this.props.CompName,
                SubmissionID : Id
            }
        })
        .then(d=>{
            // console.log(d.data)
            if(d.data.error === null || d.data.error === ''){
                if(d.data.result === "Correct"){
                    this.SetStatus(Id , "Correct")
                }else{
                    this.SetStatus(Id , "Incorrect")
                }
            }else{
                if(d.data.error === "Time Limit Exceeded"){
                    this.SetStatus(Id , "TLE")
                }else{
                    this.SetStatus(Id , "ERR")
                }
            }
        })
        .catch( e => console.log(e))
    }
    Accept(e){
        e.preventDefault()
        const ID = e.target.id
        axios.post('/acceptSubmission' , {
            Competition : this.props.CompName,
            SubmissionID : ID
        })
        .then(d =>{})
    }
    render(){
        return( 
        <div>
            
            <center>
                <div className = "CompDashboard"><h2>Welcome to {this.props.CompName}</h2></div>
                <br></br>
            </center>
            <div>
                {this.state.Submissions.map(s =>{
                    return(
                        <div className = "JudgeProblem">
                            <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <div className = "ProblemStatement" ><h3>{s.ProblemName}</h3></div>
                            <h5 id = "submissionstatus" className = {s.Status}> {s.Status}</h5>
                            <div className = "ProblemStatus" >
                                <h5 className = "UnSolved"> {s.TeamName}</h5>
                            </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <ButtonToolbar>
                                <Button id = {s.SubmissionID} onClick = {this.RunRequest} variant="primary">Run Solution</Button>
                                <Button id = {s.SubmissionID} onClick = {this.Compare} variant="warning">Compare Solution</Button>
                                <Button id = {s.SubmissionID} onClick = {this.Accept} variant="success">Accept Solution</Button>
                                <Button id = {s.SubmissionID} onClick = {this.Reject} variant="danger">Reject Solution</Button>
                            </ButtonToolbar>
                            </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    )
                })}
            </div>
        </div>
        )
    }
}