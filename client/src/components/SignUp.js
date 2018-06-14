import React, { Component } from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import { Redirect, Link } from "react-router-dom";
import moment from "moment";
import "./SignUp.css";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gamerName: "",
      email: "",
      password: "",
      avatar: "",
      loggedIn: false
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

  onSubmit = e => {
    console.log("before response loggedIn status: " + this.state.loggedIn);
    fetch("http://localhost:3001/api/signup/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gamerName: this.state.gamerName,
        email: this.state.email,
        password: this.state.password,
        signupDate: moment().format("llll"),
        
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("gamerName", res.gamerName);
          localStorage.setItem("avatar", res.avatar)

          //alert("Gamer registrado correctamente");
          //console.log(localStorage.token);
          //console.log(localStorage.gamerName);
          this.setState({
            loggedIn: true
          });
          //console.log("after response loggedIn status: " + this.state.loggedIn);
        }
      });
  };

  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to="/" />;
    }
    return (
      <Grid centered id="mainGridSignUp">
        <Grid.Column width={5}>
          <h1 className="titulo">Sign Up to improve your English</h1>
          <hr />
          <Form id="signup" onSubmit={this.onSubmit}>
            <Form.Field>
              <label>
                <h1>Your name</h1>
              </label>
              <input
                placeholder="Name"
                name="gamerName"
                onChange={this.onInputChange}
              />
            </Form.Field>
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
              Sign Up
            </Button>
            <br />
            <br />
            <h1>Already Signed?</h1>
            <hr />
            <br />
            <Link to="/signin">
              <Button inverted color="grey">
                Sign In
              </Button>
            </Link>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

/*

*/
