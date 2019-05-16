import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client'
import LINK from './link'
import { Button , ButtonToolbar, Modal } from 'react-bootstrap';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

class MyVerticallyCenteredModal extends React.Component {
    constructor(props){
        super(props)
        this.get_Output = this.get_Output.bind(this)
    }
    get_Output(id){
        var temp = this.props.Submissions
        for( var i = 0 ; i < temp.length ; i++){
            if(temp[i].SubmissionID === id){
                return temp[i].Output
            }
        }
    }
    render() {

        var outputs = this.get_Output(this.props.ID)
        if(!outputs){
            outputs = []
        }

      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {/* Modal heading */}
              {this.props.Name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
             <div className = "CompareHeader"> 
                <h4>Actual Output</h4>
             </div>
            <div className = "CompareHeader"> 
                <h4>Expected Output</h4>
             </div>
            <div className = "Output">
                {outputs.map(o =>{
                    let v = "NotMatched"
                    if(o[2] === 1){
                        v = "Matched"
                    }
                    return(
                        <h5 className = {v}>{o[0]}</h5>
                    )
                })}
            </div>
            <div className = "Expected">
                {outputs.map(o =>{
                    let v = "NotMatched"
                    if(o[2] === 1){
                        v = "Matched"
                    }
                    return(
                        <h5 className = {v}>{o[1]}</h5>
                    )
                })}
            </div>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
export default class Judge extends Component{
    constructor(props){
        super(props)
        this.state = {
            Name : props.Name,
            Submissions : []
        }
        this.fetchSubmissions = this.fetchSubmissions.bind(this)
        this.SetStatus = this.SetStatus.bind(this)
        this.RunRequest = this.RunRequest.bind(this)
        this.Accept = this.Accept.bind(this)
        this.Reject = this.Reject.bind(this)
        this.setModal = this.setModal.bind(this)
        this.hidemodal = this.hidemodal.bind(this)
        this.pushOutput = this.pushOutput.bind(this)
        this.openScoreBoard = this.openScoreBoard.bind(this)
    }
    openScoreBoard(){
        window.open(`http://check-mate.ml/Scoreboard/${this.props.CompName}`)
    }
    pushOutput(id , Output){
        var temp = this.state.Submissions
        for( var i = 0 ; i < temp.length ; i++){
            if(temp[i].SubmissionID === id){
                temp[i].Output = Output
                break;
            }
        }
        this.setState({Submissions:temp})
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
        socket.on('RemoveSubmission' , d =>{
            let subs = this.state.Submissions
            subs = subs.filter( e => e.SubmissionID !== d)
            this.setState({Submissions : subs})
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
        // console.log(Id)
        this.SetStatus(Id , "Pending")
        axios.get(LINK + 'runSubmission' , {
            params :{
                Competition : this.props.CompName,
                SubmissionID : Id
            }
        })
        .then(d=>{
            // console.log(d.data)
            this.pushOutput(Id , d.data.Output)
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
        let subs = this.state.Submissions
            subs = subs.filter( e => e.SubmissionID !== ID)
            this.setState({Submissions : subs})
        axios.post(LINK + 'AcceptSubmission' , {
            Competition : this.props.CompName,
            SubmissionID : ID
        })
        .then(d =>{
            console.log(d)
        })
        .catch(e => console.log(e))
    }
    hidemodal(){
        var temp = this.state.Submissions
        for( var i = 0 ; i < temp.length ; i++){
                temp[i].showmodal = false
        }
        this.setState({Submissions:temp})
    }
    setModal(e){
        let id = e.target.id
        let val = true
        var temp = this.state.Submissions
        for( var i = 0 ; i < temp.length ; i++){
            if(temp[i].SubmissionID === id){
                temp[i].showmodal = val
            }
        }
        this.setState({Submissions:temp})
    }
    Reject(e){
        e.preventDefault()
        const ID = e.target.id
        let subs = this.state.Submissions
            subs = subs.filter( e => e.SubmissionID !== ID)
            this.setState({Submissions : subs})
        axios.post(LINK + 'rejectSubmission' , {
            Competition : this.props.CompName,
            SubmissionID : ID
        })
        .then(d =>{
            console.log(d)
        })
        .catch(e => console.log(e))
    }
    render(){
        var indicator = true
        if(this.state.Submissions.length < 1){
            indicator = false
        } 
        return( 
        <div>
            
            <center>
                <div className = "CompDashboard"><h2>{this.props.Name}, Welcome to {this.props.CompName}</h2></div>
                <br></br>
            </center>
            <div>
                <Button className= "ScoreboardButton" variant="secondary" onClick = {this.openScoreBoard}> Scoreboard</Button>
                {indicator? (this.state.Submissions.map(s =>{
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
                                <Button id = {s.SubmissionID} onClick={this.setModal} variant="warning">Compare Outputs</Button>
                                <Button id = {s.SubmissionID} onClick = {this.Accept} variant="success">Accept Solution</Button>
                                <Button id = {s.SubmissionID} onClick = {this.Reject} variant="danger">Reject Solution</Button>
                            </ButtonToolbar>
                            </ExpansionPanelDetails>
                            <MyVerticallyCenteredModal
                                    show={s.showmodal}
                                    ID = {s.SubmissionID}
                                    Name = {s.TeamName}
                                    Submissions = {this.state.Submissions}
                                    onHide={this.hidemodal}
                            />
                            </ExpansionPanel>
                        </div>
                    )
                })):(
                    <h3 className = "Waiting" >No Pending Submissions...</h3>
                )}
            </div>
        </div>
        )
    }
}