import React, { Component } from 'react';
import Header from '../components/Header'
import { Quizzes } from '../components/Quizzes'
import Footer from '../components/Footer'

export default class Quiz extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="App-intro">
                    <Quizzes />
                </div>
                <Footer />
            </div>
        
        )
    }
}