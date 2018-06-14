import React, { Component } from "react";
import { Grid, Segment, Pagination } from "semantic-ui-react";

export default class AdminListQuizzes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
      currentPage: 1,
      quizzesPerPage: 3,
      boundaryRange: 1,
      siblingRange: 1,
      showEllipsis: true,
      showPreviousAndNextNav: true
    };
  }

  handlePaginationChange = (e, { currentPage }) => {
    let target = e.target;
    let value = target.innerText;
    if (target.type === "nextItem") {
      this.setState({ currentPage: this.state.currentPage + 1 });
    } else if (target.type === "prevItem") {
      this.setState({ currentPage: this.state.currentPage - 1 });
    } else if (target.type === "firstItem") {
      this.setState({ currentPage: 1 });
    } else if (target.type === "lastItem") {
      const lastPage = Math.ceil(
        this.state.quizzes.length / this.state.quizzesPerPage
      );
      this.setState({ currentPage: lastPage });
    } else {
      this.setState({ currentPage: value });
    }
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
        console.log(this.state.quizzes);
      });
  }

  render() {
    const {
      quizzes,
      currentPage,
      quizzesPerPage,
      boundaryRange,
      siblingRange,
      showPreviousAndNextNav
    } = this.state;

    // Logic for displaying todos
    const indexOfLastQuiz = currentPage * quizzesPerPage;
    const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
    const currentQuizzes = quizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);
    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(quizzes.length / quizzesPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={12}>
            <h1 className="titulo">List of Quizzes</h1>
            {currentQuizzes.map((q, index) => {
              return (
                <Segment key={index}>
                  <h4>{q.question}</h4>
                  <ul>
                    {q.answers.map((a, index) => {
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
          <Pagination
            className="listPages"
            activePage={currentPage}
            onPageChange={this.handlePaginationChange}
            totalPages={pageNumbers.length}
            boundaryRange={boundaryRange}
            size="mini"
            siblingRange={siblingRange}
            prevItem={showPreviousAndNextNav ? undefined : null}
            nextItem={showPreviousAndNextNav ? undefined : null}
          />
        </Grid.Row>
      </Grid>
    );
  }
}
