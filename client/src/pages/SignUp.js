import React, { Component } from 'react'
import Header from '../components/Header'
import SignUp from '../components/SignUp'
import Footer from '../components/Footer'

export default class SignUpContainer extends Component {
    render() {
        return (
            <div>
                <Header />
                <SignUp />
                <Footer />  
            </div>   
        )
    }
}
