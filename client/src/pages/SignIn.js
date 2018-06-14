import React, { Component } from 'react'
import Header from '../components/Header'
import SignIn from '../components/SignIn'
import Footer from '../components/Footer'


export default class SignInContainer extends Component {
    render() {
        return (
            <div>
                <Header />
                <SignIn />
                <Footer />
            </div>   
        )
    }
}
