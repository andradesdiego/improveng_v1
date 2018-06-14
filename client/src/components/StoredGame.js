import React, { Component } from 'react'


export default class StoredGame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentQuestion: "",
            clickedAnswer: this.props.clickedAnswer,
            clickedCorrect: this.props.clickedCorrect
        }
    }
    componentDidMount(){
        this.setState({
            currentQuestion: this.state.currentQuestion
        })
    }
    render(){
        // console.log(this.state.currentQuestion)
        // console.log(this.state.clickedAnswer)
        // console.log(this.state.clickedCorrect)
        return(
            <div>
                <h5>{this.props.currentQuestion}</h5>
            </div>
        )
    }
}