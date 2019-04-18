import React, { Component } from 'react';
import axios from 'axios'
import LINK from './link'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
export default class Team extends Component{
    constructor(props){
        super(props)
        this.state = {
            Problems : []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
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
                                <form>
                                    <input type = 'file'required= "true" ></input>
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
// import React, { Component } from 'react';
// import axios from 'axios'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// // const axios = require("axios");
// class CodeSubmit extends Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             selectedFile : '',
//             description : ''
//         };
//         this.onChange = this.onChange.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//     };
//     onChange(e){
//         switch (e.target.name) {
//           case 'selectedFile':
//             this.setState({ selectedFile: e.target.files[0] });
//             break;
//           default:
//             this.setState({ [e.target.name]: e.target.value });
//         }
//     }
//     onSubmit(e){
//         e.preventDefault();
//         const { description, selectedFile } = this.state;
//         let formData = new FormData();

//         formData.append('description', description);
//         formData.append('selectedFile', selectedFile);
//         axios.post('http://10.130.60.5:8600/', formData)
//           .then((result) => {
//             console.log('Result')
//           })
//           .catch((err)=>{
//               console.log(err)
//           })
//         this.props.submitFile('f')
//       }
//       render() {
//         const { description, selectedFile } = this.state;
//         return (
//           <form onSubmit={this.onSubmit}>
//             <input
//               type="text"
//               name="description"
//               value={description}
//               onChange={this.onChange}
//             />
//             <input
//               type="file"
//               name="selectedFile"
//               onChange={this.onChange}
//             />
//             <button type="submit">Submit</button>
//           </form>
//         );
//     }


// }
// export default class Team extends Component{
//     constructor(props){
//         super(props);
//     }
//     render(){
//         return (
//             <center>
//                 <h1>
//                     <i>Please Submit Your Code Here</i>
//                 </h1>
//                 <CodeSubmit submitFile = {this.props.submitFile}/>
//             </center>
            
//         )
//     }
// }