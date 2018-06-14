import React, { Component } from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import { Redirect, Link } from "react-router-dom";
import "./SignIn.css";

//export let fullGames = []

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      gamerName: "",
      token: "",
      loggedIn: false,
      unAuth: false
    };
  }
  onInputChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  onAuth = () => {
    this.setState({
      unAuth: false
    })
  }
  onSubmit = e => {
    //console.log("before response loggedIn status: " + this.state.loggedIn);
    fetch("http://localhost:3001/api/signin/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("gamerJSON", JSON.stringify(res.gamer));
          localStorage.setItem("gamer", res.gamer);
          localStorage.setItem("gamerName", res.gamer.gamerName);
          localStorage.setItem("avatar", res.gamer.avatar);
          localStorage.setItem("signupDate", res.gamer.signupDate);
          localStorage.setItem("games", res.gamer.gamesPlayed);

          //console.log(localStorage.gamerName);

          this.setState({
            gamerName: res.gamer.gamerName,
            loggedIn: true
          });
          //console.log("after response loggedIn status: " + this.state.loggedIn);
        } else {
          this.setState({
            unAuth: true
          });
        }
      });
  };
  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to="/" />;
    } else if (this.state.unAuth === true) {
      return (
        <div id="unAuth">
          <h1 className="titulo">Oh sorry...  Invalid email or password</h1>
          <Link to={"/signin"} className="homeButton">
            <Button onClick={this.onAuth} size="huge">Try again</Button>
          </Link>
          <h1 className="titulo">Or</h1>
          <Link to={"/signup"} className="homeButton">
            <Button onClick={this.onAuth} size="huge">Sign Up</Button>
          </Link>
        </div>
      );
    } else {
      return (
        <Grid centered id="mainGrid">
          <Grid.Column width={5}>
            <h1 className="titulo">Sign In with your email</h1>
            <hr />

            <Form id="signin" onSubmit={this.onSubmit}>
              <Form.Field>
                <label>
                  <h1>Your email</h1>
                </label>
                <input
                  placeholder="Email"
                  name="email"
                  onChange={this.onInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>
                  <h1>Your password</h1>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.onInputChange}
                />
              </Form.Field>
              <br />

              <Button type="submit" inverted color="grey">
                Sign In
              </Button>
              <br />
              <br />
              <h1>Need an account?</h1>
              <hr />
              <br />
              <Link to="/signup">
                <Button inverted color="grey">
                  Sign Up
                </Button>
              </Link>
            </Form>
          </Grid.Column>
        </Grid>
      );
    }
  }
}
export default SignIn;
