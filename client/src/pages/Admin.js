import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import AdminPanel from '../components/AdminPanel'

export default class Admin extends Component {
    render() {
        return (
            <div>
                <Header />
                    <AdminPanel />
                <Footer />
            </div>   
        )
    }
}