import _ from "lodash";
import React, { Component } from "react";
import { Grid, Segment, Search, Button } from "semantic-ui-react";

let source = [];
//let sourceQ = []
export default class AdminDelQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
      isLoading: false,
      results: "",
      value: "",
      updated: false
    };
  }
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result[0].question });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.question);
      //const isMatch = result => re.test(result);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch)
      });
    }, 300);
  };

  deleteQuiz = e => {
    const quizID = e.target.id;
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authorization", "Bearer " + localStorage.token);
    fetch("http://localhost:3001/api/quiz/" + quizID, {
      method: "DELETE",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(quiz => {
        console.log(JSON.stringify(quiz));
        this.setState({ value: "", updated: true });
      });
    console.log(quizID);
  };
  componentDidMount() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authorization", "Bearer " + localStorage.token);
    fetch("http://localhost:3001/api/quiz", {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(quizzes => {
        console.log(quizzes);
        this.setState({
          quizzes: quizzes.quizzes
        });
        source = quizzes.quizzes;
        //quizzes.quizzes.map((q, index)=>(source.push(q.question)))
        console.log(this.state.quizzes);
      });
  }

  render() {
    const { isLoading, value, results, updated } = this.state;
    console.log("value:" + value);
    console.log("results" + JSON.stringify(results));
    if (updated !== true) {
      return (
        <Grid centered>
          <Grid.Column width={12}>
            <h1 className="titulo">Search a Quiz to delete</h1>
            <div className="searchQuiz">
              <Search
                title={results}
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true
                })}
                //results={JSON.stringify(results)}
                value={value}
              />
            </div>
          </Grid.Column>
          <Grid.Row>
            <Grid.Column width={6}>
              {this.state.results.map((r, index) => {
                return (
                  <Segment key={index} clearing>
                    
                      <h4 floated="left">{r.question}</h4>
                      <Button
                        floated="left"
                        size="small"
                        id={r._id}
                        color="red"
                        onClick={this.deleteQuiz}
                      >
                        Delete Quiz
                      </Button>
                   
                  </Segment>
                );
              })}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    } else {
      return <h1>Your quiz has been deleted!</h1>;
    }
  }
}
