import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
const LINK = 'http://10.130.60.5:8300/'
export default class Admin extends Component{
    constructor(){
        super()
        this.state = {
            UserName :'Taimoor',
            Initial : true,
            CompName: '',
            No_Teams:'',
            No_Judges:'',
            Duration: '',
            Teams: null,
            Judges: null,
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleInitialSubmit = this.handleInitialSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)

    }
    componentDidMount(){
        axios.get(LINK + 'checkcomp' , {
            params:{
                "Name" : this.state.UserName
            }
        })
        .then((d)=>{
            // console.log(d.data)
            if(d.data !== '404'){
                this.setState(d.data)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    handleInitialSubmit(event){
        console.log('DARTA SENT')
        event.preventDefault()
        axios.post(LINK + 'CompInitials' , this.state)
        .then((d)=>{
            console.log(d.data)
            this.setState(d.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    handleChange(e){
        switch(e.target.name){
            case 'NAME':
                this.setState({CompName: e.target.value})
                break;
            case 'noTeams':
                this.setState({No_Teams: e.target.value})
                break;
            case 'noJudges':
                this.setState({No_Judges: e.target.value})
                break;
            case 'Duration':
                this.setState({Duration: e.target.value})
                break;
            default:
                break;
        }
    }
    render(){
        return(
            <div >
                { this.state.Initial ?(
                    <div className = "OuterAdmin">
                        <div className = "InnerAdmin">
                            <form onSubmit = {this.handleInitialSubmit}>
                                {/* <label >Competition Name</label> */}
                                <input Name = "NAME" placeholder ="Competetion Name" type = 'text' onChange={this.handleChange} required= "true"></input>
                                {/* <label>No Teams</label> */}
                                <input Name = "noTeams" placeholder ="Number of Teams" type = 'text' onChange={this.handleChange} required= "true" ></input>
                                {/* <label>No Judges</label> */}
                                <input Name = "noJudges" placeholder ="Number of Judges" type = 'text' onChange={this.handleChange} required= "true"></input>
                                {/* <label>Duration</label> */}
                                <input type="checkbox" name="vehicle1" value="Bike"></input> Auto Judge In the Start?<br></br>
                                <input Name = "Duration" placeholder ="Duration" type = 'text' onChange={this.handleChange} required= "true"></input>
                                <input type = 'Submit' value = "Save Competition"></input>
                            </form>
                        </div>
                    </div>
                ):(
                    <h2> FINAL STATE </h2>
                )}
            </div>
        )
    }
}