import React, { Component } from 'react'
import './Quizzes.css'

export default class Answers extends Component {
   
    render () {
      return (
            <span id="answers" 
                className="answerWrapper answers" 
                data-correct={this.props.correct.toString()} 
                onClick={this.props.onClick}>{this.props.answer}
            </span>
      )
    }
  }
