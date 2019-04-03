import React, { Component } from 'react';

export default class Admin extends Component{
    constructor(){
        super()
        this.state = {
            Initial : true,
            Saved : false,
            compID : null,
            judges : [],
            teams : [],
            problems : []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault()
        console.log(e)
    }
    render(){
        // return(<h1>HELLO ADMIN</h1>)
        return(
            <div>
                { this.state.Initial ?(
                    <form onSubmit = {this.handleSubmit}>
                        <input Name="Name" type = 'text' placeholder="Competition Name" required= "true"></input>
                        <br></br>
                        <input Name="TEAMS_COUNT" type = 'text' placeholder="No of Teams In Competition" required= "true" ></input>
                        <br></br>
                        <input Name="JUDGES_COUNT" type = 'text' placeholder="No of Judges In Competition" required= "true"></input>
                        <br></br>
                        <input Name="Duration" type = 'text' placeholder="Duration (Minutes)" required= "true"></input>
                        <br></br>
                        <input type = 'Submit' value = "Save Competiton"></input>
                    </form>
                ):(
                    <h2> FINAL STATE </h2>
                )}
            </div>
        )
    }
}