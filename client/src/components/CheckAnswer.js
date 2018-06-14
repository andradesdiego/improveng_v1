import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import './Quizzes.css'

export default class CheckAnswer extends Component {
  render () {
      return (  
        <div id="check">
        <Button.Group>
          <Button labelPosition='left' icon='left chevron' content='Quit Game' onClick={this.props.quit} size='huge' inverted color='grey'/>
          <Button labelPosition='right' icon='right chevron' content='Next Quiz' onClick={this.props.next} size='huge' inverted color='grey'/>
        </Button.Group>
        </div>
      )
  }
}
