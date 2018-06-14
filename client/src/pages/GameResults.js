import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { partida } from '../components/Quizzes'
import { Segment, Grid } from 'semantic-ui-react'


export default class Gamer extends Component {
    constructor() {
        super()
        this.state = {
            playedGame: partida
        }
    }
    render() {
        console.log(partida)
        return (
            <div>
                <Header />
                <h3 className="App-intro">
                Estos son tus resultados
                </h3>
                {partida.map( a => 
                    <div>
                        <h4>{a.question}</h4>
                        <h4>{a.answer}</h4>
                        <h4>{a.correct}</h4>
                    </div>
                )}
                <div id="gameResults">
            <h1>Your played quizzes</h1>
            <Grid>
              <Grid.Row>
                <Grid.Column width={10}>
                  
                  {partida.map( (a, index) => {
                      if (a.correct === "true"){
                        return (
                          <div  className="answersResults" key={a.question}>
                          <Segment>{index+1} - Pregunta: {a.question}</Segment>
                          <Segment color="green" inverted raised>
                            <h4>Respuesta seleccionada correcta: {a.answer}</h4>
                          </Segment>
                        </div>
                        )
                      } else {
                        return (
                          <div  className="answersResults" key={a.question}>
                          <Segment>{index+1} - Pregunta: {a.question}</Segment>
                          <Segment color="red" inverted raised>
                            <h4>Respuesta seleccionada errónea: {a.answer}</h4>
                          </Segment>
                        </div>
                        )
                      }
                    }
                  )}
                </Grid.Column>
                </Grid.Row>
                </Grid>
                </div>
                <Footer />
            </div>
        
        )
    }
}