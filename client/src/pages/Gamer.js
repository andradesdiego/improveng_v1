import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import Gamer from '../components/Gamer'

import { partida } from '../components/Quizzes'
//import { Segment, Grid } from 'semantic-ui-react'


export default class GamerPage extends Component {
    constructor() {
        super()
        this.state = {
            playedGame: partida
        }
    }
    render() {
       
        return (
            <div>
                <Header />
                <Gamer />
                <Footer />
            </div>
        
        )
    }
}