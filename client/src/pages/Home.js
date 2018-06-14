import React, { Component } from 'react';
import Header from '../components/Header'
import IntroContainer from '../components/IntroContainer'
import Footer from '../components/Footer'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <IntroContainer />
                <Footer />
            </div>   
        )
    }
}
    
