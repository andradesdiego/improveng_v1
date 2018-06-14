import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <h1>Lo sentimos pero la página que buscas no está disponible</h1>
                <Footer />
            </div>   
        )
    }
}
    