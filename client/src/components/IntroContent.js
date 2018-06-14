import React from "react"
import { Grid, Button } from "semantic-ui-react"
import { Link } from 'react-router-dom'

const IntroContent = () => (
  <Grid>
    <Grid.Column width={8} className="intro-wrapper">
      <h1 className="homeTitle">Improve your English</h1>
        <h2>A Single Page App to use "On the Go" !!</h2>
     <br/>
      <h3 className="intro-content">
        IMPROV.ENG is a platform to learn English through quizzes in an easy, fun and entertaining way.<br/>
        It is ideal to use on the fly, taking advantage of every wait or trip, during breakfast or before going to bed.<br/>
        It is always available to improve your English!<br/>
        What are you waiting to start? Sign up now!
      </h3>
      <div id="homeButtons">
      <Link to={"/signup"} className="homeButton">
        <Button color="teal" size='huge'>Sign up</Button>
      </Link>
      <Link to={"/signin"} className="homeButton">
        <Button size='huge'>Log-in</Button>
      </Link>
      </div>
      
    </Grid.Column>
  </Grid>
);

export default IntroContent;
