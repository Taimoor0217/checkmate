import React, { Component } from 'react';
export default class Judge extends Component{
    constructor(props){
        super(props)
        this.state = {
            Name : props.Name
        }
    }
    render(){
        return( 
        <div>
            <h1>This is the Judge Page</h1>
            <h1>You are {this.state.Name}</h1>
        </div>
        )
    }
}