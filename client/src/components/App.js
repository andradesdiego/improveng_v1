
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import Home from '../pages/Home'
import Quiz from '../pages/Quiz'
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import Gamer from '../pages/Gamer'
import NotFound from '../pages/NotFound'
import Admin from '../pages/Admin'
import AboutMe from '../pages/AboutMe'
import AboutTech from '../pages/AboutTech'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/quiz' component={Quiz} />
          <Route path='/signup' component={SignUp} />
          <Route path='/signin' component={SignIn} />
          <Route path='/gamer' component={Gamer} />
          <Route path='/admin' component={Admin} />
          <Route path='/about_me' component={AboutMe} />
          <Route path='/technologies' component={AboutTech} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
