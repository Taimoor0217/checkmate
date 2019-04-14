import React, { Component } from 'react';
export default class Team extends Component{
    constructor(props){
        super(props)
        this.state = {
            Name : props.Name
        }
    }
    render(){
        return( 
        <div>
            <h1>This is the Team Page</h1>
            <h1>You are {this.state.Name}</h1>
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