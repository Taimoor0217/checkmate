import React, { Component } from 'react';
import link from './link'
import axios from 'axios'
import {Table } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import io from 'socket.io-client'
function sort(array){
    return array.sort((a , b)=>{return b.Score - a.Score})
}
export default class Scoreboard extends Component{
    constructor(props){
        super(props)
        this.state = {
            teams : []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.componentWillMount = this.componentWillMount.bind(this)
        this.fetchUpdates = this.fetchUpdates.bind(this)
        
    }
    fetchUpdates(){
        axios.get(link + 'ScoreBoard' , {
            params:{
                Competition : this.props.match.params.id,
            }
        })
        .then(d=>{
            var teams = sort(d.data.teams)
            this.setState({teams:teams})
            // console.log(d.data.teams)
        })
        .catch(e=>{
            console.log(e)
        })
    }
    componentWillMount(){
        this.fetchUpdates()
    }
    componentDidMount(){
        const socket = io(link)
        socket.on('FetchNewScoreboard', d =>{
            this.fetchUpdates()
        })
    }
    render(){
        return(
            <div>
            <div className = "ScoreBoardHeader">
                <center><h1>{this.props.match.params.id} LeaderBoard</h1></center>
            </div>
            <div className = "ScoreBoard">
                
                <Paper>
                    <Table responsive="sm">
                        <tbody>
                            <tr>
                                <th>Position</th>
                                <th>Team Name</th>
                                <th>Solved</th>
                                <th>Score</th>
                            </tr>
                            {this.state.teams.map( (t , index) =>{
                                index = index + 1
                                if(index === 1 ){
                                    index = "1st"
                                }
                                return(
                                <tr key = {index}>
                                    <td> {index} </td>
                                    <td> {t.TeamName} </td>
                                    <td> {t.Solved} </td>
                                    <td> {t.Score} </td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Paper>
            </div>
            </div>
        )
    }
}