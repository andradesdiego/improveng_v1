import React, { Component } from "react";
import { Button, Form, Grid } from "semantic-ui-react";

export default class AdminAddQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      correctAnswer: "",
      wrongAnswer1: "",
      wrongAnswer2: ""
    };
  }

  onInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authorization", "Bearer " + localStorage.token);
    fetch("http://localhost:3001/api/quiz", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        question: this.state.question,
        answers: [
          {
            answer: this.state.correctAnswer,
            correct: true
          },
          {
            answer: this.state.wrongAnswer1,
            correct: false
          },
          {
            answer: this.state.wrongAnswer2,
            correct: false
          }
        ]
      })
    })
      .then(res => res.json())
      .then(quiz => {
        console.log(JSON.stringify(quiz));
        this.setState({
          question: "",
          correctAnswer: "",
          wrongAnswer1: "",
          wrongAnswer2: ""
        });
      });
  };

  componentDidMount() {
    this.setState({
      //currentQuestion: this.state.currentQuestion
    });
  }
  render() {
    return (
     
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={12}>
              <Form onSubmit={this.onSubmit}>
                <h1 className="titulo">Add a new Quiz</h1>
                <Form.Field>
                  <label>
                    <h1>Question</h1>
                  </label>
                  <input
                    placeholder="Question"
                    name="question"
                    onChange={this.onInputChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>
                    <h1>Correct Answer</h1>
                  </label>
                  <input
                    placeholder="Correct Answer"
                    name="correctAnswer"
                    onChange={this.onInputChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>
                    <h1>Wrong Answer 1</h1>
                  </label>
                  <input
                    placeholder="Wrong Answer 1"
                    name="wrongAnswer1"
                    onChange={this.onInputChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>
                    <h1>Wrong Answer 2</h1>
                  </label>
                  <input
                    placeholder="Wrong Answer 2"
                    name="wrongAnswer2"
                    onChange={this.onInputChange}
                  />
                </Form.Field>
                <br />
                <br />
                <Button type="submit">Create Quiz</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
     
    );
  }
}
