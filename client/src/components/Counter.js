import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
//import { Redirect } from "react-router-dom";



export default class Counter extends Component {
    constructor(props){
        super(props)
        this.state = { 
            modalOpen: false,
            counter: 0,
            start: null
        }
    }
    handleOpen = () => this.setState({ modalOpen: true })
      
    handleClose = () => this.setState({ modalOpen: false })

    next = () => ( this.state.start )
    
    OnClick = () => {
        this.handleClose();
        this.next();
    }
      
    minusOne = () => {
        this.setState({ counter: this.state.counter -1 })
        if (this.state.counter <= 0){
            //clearInterval(this.interval)
            this.setState({ modalOpen: true })
        }
    }

    componentDidMount(){
        this.setState({ counter: this.props.counter })
        this.setState({ start: this.props.start })
        this.interval = setInterval(this.minusOne, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    render() {
        if(this.state.counter > 0){
            return (
                <Button size="huge" color="purple">{this.state.counter}</Button>
            )
        } else {
            return (
                <Modal
                  open={this.state.modalOpen}
                  onClose={this.OnClick}
                  basic size='small'>
                    <Header icon='question' content='Ahhh me ha pillado!!!' />
                    <Modal.Content>
                        <h1>Debes ser más rápido si quieres conseguir algo en la vida...</h1>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.OnClick} inverted>
                        <Icon name='checkmark' /> Continúa con el quiz!
                        </Button>
                    </Modal.Actions>
                </Modal>
            )
        }
        
    }
}
  