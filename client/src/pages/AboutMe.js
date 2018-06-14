import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import AboutMe from '../components/AboutMe'

export default class GamerPage extends Component {

    render() {
        return (
            <div>
                <Header />
                <AboutMe />
                <Footer />
            </div>
        
        )
    }
}