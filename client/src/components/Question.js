import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import './Quizzes.css'

export default class Question extends Component {
  render () {
      return (  
        <div id="quiz">
            <Card fluid key={this.props.question} header={this.props.question} /> 
        </div>
      )
  }
}
