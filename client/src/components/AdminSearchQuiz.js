import _ from "lodash";
import React, { Component } from "react";
import { Grid, Segment, Search } from "semantic-ui-react";

let source = [];
//let sourceQ = []
export default class AdminListQuizzes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
      isLoading: false,
      results: "",
      value: ""
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
    const { isLoading, value, results } = this.state;
    console.log("value:" + value);
    console.log("results" + JSON.stringify(results));
    return (
      <Grid centered>
        <Grid.Column width={12}>
        <h1 className="titulo">Matching Quizzes</h1>
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
          <Grid.Column width={12}>
            
            {this.state.results.map((r, index) => {
              return (
                <Segment key={index}>
                  <h4>{r.question}</h4>
                  <ul>
                    {r.answers.map((a, index) => {
                      return (
                        <li key={index}>
                          {a.answer}: {a.correct.toString()}
                        </li>
                      );
                    })}
                  </ul>
                </Segment>
              );
            })}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
