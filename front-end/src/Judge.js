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
    }
    fetchSubmissions(){
        axios.get(LINK + 'getSubmissions' , {
            params:{
                Competition : this.props.CompName
            }
        })
        .then(d=>{
            this.setState({Submissions : d.data })
        })
    }
    componentWillMount(){
        this.fetchSubmissions()
    }
    componentDidMount(){
        const socket = io(LINK)
        socket.on('FetchNewSubmissions', d =>{
            this.fetchSubmissions()
        })
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
                        <div className = "TeamProblem">
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
                                <Button variant="primary">Run Solution</Button>
                                <Button variant="warning">Compare Solution</Button>
                                <Button variant="success">Accept Solution</Button>
                                <Button variant="danger">Reject Solution</Button>
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