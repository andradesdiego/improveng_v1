import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import AboutTech from '../components/AboutTech'

export default class GamerPage extends Component {

    render() {
        return (
            <div>
                <Header />
                <AboutTech />
                <Footer />
            </div>
        
        )
    }
}