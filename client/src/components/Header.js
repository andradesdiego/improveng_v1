import React, { Component } from 'react';
import MenuSemantic from '../components/MenuSemantic'

export default class Header extends Component {
    render() {
        return (
        <header className="App-header">
            <MenuSemantic />
        </header>
        )
    }
}