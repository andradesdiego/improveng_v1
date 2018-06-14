import React, { Component } from "react"
import { Grid, Button } from "semantic-ui-react"
import { Link } from 'react-router-dom'
import NumberQuizzes from './NumberQuizzes'

function SignOut (props) {
    localStorage.gamerName = ""
    localStorage.playedGame = ""
    localStorage.token = ""
    localStorage.NumberQuizzes = ""
  }

 
class IntroSignedIn extends Component {
 constructor(props){
     super(props);
     this.state = {
        gamerName: localStorage.gamerName
     }
 }
 render() {
     return (
        <Grid className="mainGrid">
            <Grid.Column width={16} className="intro-wrapper">
                <h1 className="tituloSignedIn">Welcome {this.state.gamerName}</h1>
                 <NumberQuizzes />
                 <div className="signedInButtons">
                 <Link to={"/"} className="homeButton">
                    <Button onClick={SignOut} size='huge'>Sign Out</Button>
                </Link>
                 </div>
                 
            </Grid.Column>
           
        </Grid>
     )
 }
}

export default IntroSignedIn;
