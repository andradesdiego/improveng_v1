import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Input } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";


export default class NumberQuizzes extends Component {
    constructor(props){
        super(props)
        this.state = { 
            modalOpen: false,
            nQuizzes: ""
        }
    }
    handleOpen = () => this.setState({ modalOpen: true })
      
    handleClose = () => this.setState({ modalOpen: false })
      
    onInputChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
         return this.setState({
          [name]: value
        })  
    }

    componentDidUpdate(){
        console.log(this.state.nQuizzes)
        localStorage.setItem('NumberQuizzes', this.state.nQuizzes);
    }

    render() {
        if (localStorage.NumberQuizzes !== "") {
            return <Redirect to="/quiz" />;
          }
        return (
            <Modal centered
              trigger={<Button color="teal" onClick={this.handleOpen} size='huge'>Start Quiz</Button>}
              open={this.state.modalOpen}
              onClose={this.handleClose}
              basic size='small'>
              <Header icon='time' content='Ready?' />
              <Modal.Content>
                <br/>
                <h1>Type a number of quizzes to play</h1>
                <br/>
                <Input onChange={this.onInputChange} name="nQuizzes" focus placeholder='Número de quizzes...' />        </Modal.Content>
              <Modal.Actions>
                <Button color='black' onClick={this.handleClose} inverted>
                  <Icon name='checkmark' /> Let's get started!
                </Button>
              </Modal.Actions>
            </Modal>
        )
    }
}
  