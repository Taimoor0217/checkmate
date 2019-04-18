import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class LandingPage extends Component{
    render(){
        return(
            <div>
                <div className = "LandingDiv">
                {/* <span class="w3-jumbo w3-hide-small">Join the world of competition</span><br></br>
                <span class="w3-xxlarge w3-hide-large w3-hide-medium">Join the world of competition</span><br></br>
                <span class="w3-large">Talk is cheap, show me the code.(Linus Torvalds) </span>
                <p><a class="w3-button w3-white w3-padding-large w3-large w3-margin-top w3-opacity w3-hover-opacity-off">Get Started</a></p> */}
                <div className= "CheckMate">
                    <h1 className  = "CheckMateHead" >CheckMate</h1>
                    <h5 className  = "CheckMateTag">Your Code Checking Mate</h5>
                    <Button className = "getstarted" variant="secondary" size="lg" href="/getstarted">
                        Get Started
                    </Button>
                </div>
                </div>
                <div id = "about" className="w3-row-padding w3-center" >
                <div className="w3-quarter">
                <i className="fa fa-trophy w3-margin-bottom w3-jumbo w3-center"></i>
                <p className="w3-large">Conduct Competitions</p>
                <p>CheckMate provides a interactive UI and fascilitates you conducting coding based competitions.</p>
                </div>
                <div className="w3-quarter">
                <i className="fa fa-code w3-margin-bottom w3-jumbo"></i>
                <p className="w3-large">Code to Compete</p>
                <p>Participate individually or make teams to compete against others. Get updated where you stand in comparison with others.</p>
                </div>
                <div className="w3-quarter">
                <i className="fa fa-users w3-margin-bottom w3-jumbo"></i>
                <p className="w3-large">Judges to inspect code</p>
                <p>Judges will be added in competition to inspect the code to help competitors grow by checking results manually.</p>
                </div>
                <div className="w3-quarter">
                <i className="fa fa-cog w3-margin-bottom w3-jumbo"></i>
                <p className="w3-large">Automatic Checking</p>
                <p>CheckMate enables the competition administrator to automate the code-checking procedure and results to be shown on scorebaord.</p>
                </div>
            </div>
            </div>
        )
    }
}