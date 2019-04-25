import React, { Component } from 'react';
import axios from 'axios'
import LINK from './link'
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
export default class Team extends Component{
    constructor(props){
        super(props)
        this.state = {
            Problems : [],
            SubmittedFile : ''
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.SetStatus = this.SetStatus.bind(this)
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
            this.setState({Problems: d.data})
        })
        .catch(e=>{
            console.log(e)
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
        this.SetStatus(event.target.id , "Pending")
        const id = event.target.id
        setTimeout(()=>this.SetStatus(id , "Solved") , 4000)
    }
    render(){
        return( 
        <div>
            <center>
                <h1>This is the {this.props.CompName}</h1>
                <h1>You are {this.props.Name}</h1>
            </center>
            <div>
                {this.state.Problems.map(p =>{
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
                })}
            </div>
        </div>
        )
    }
}