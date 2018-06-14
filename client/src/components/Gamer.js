import React, { Component } from "react"
//import { Grid } from 'semantic-ui-react'
//import { Link } from 'react-router-dom'
import GamerProfile from './GamerProfile'

 
class Gamer extends Component {
 constructor(props){
     super(props);
     this.state = {
        gamerName: localStorage.gamerName
     }
 }
 render() {
     return (
         <div className="mainContainer">
            <GamerProfile />
            
         </div>
       
        
     )
 }
}

export default Gamer;
