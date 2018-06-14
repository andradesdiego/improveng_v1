import React, { Component } from "react";
import GamesHistory from "./GamesHistory";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  Image,
  Icon,
  Segment,
  Pagination,
  Button
} from "semantic-ui-react";

export default class GamerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gamerName: localStorage.gamerName,
      signupDate: localStorage.signupDate,
      avatar: localStorage.avatar,
      games: [],
      open: false,
      currentPage: 1,
      gamesPerPage: 5,
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
        this.state.games.length / this.state.gamesPerPage
      );
      this.setState({ currentPage: lastPage });
    } else {
      this.setState({ currentPage: value });
    }
  };

  handleClick = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  newGame = () => {
    localStorage.setItem("NumberQuizzes", "");
  };

  componentDidMount() {
    if (localStorage.NumberQuizzes === "") {
      localStorage.NumberQuizzes = "1";
    }
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authorization", "Bearer " + localStorage.token);
    fetch("http://localhost:3001/api/games", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        gamerName: this.state.gamerName
      })
    })
      .then(res => res.json())
      .then(games => {
        this.setState({ games: games.gamesPlayed });
        //console.log(this.state.games);
      });
  }

  render() {
    const {
      games,
      currentPage,
      gamesPerPage,
      boundaryRange,
      siblingRange,
      showPreviousAndNextNav
    } = this.state;

    // Logic for displaying todos
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);
    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(games.length / gamesPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <Grid id="gamerHistory" centered>
        <Grid.Row>
          <Grid.Column width={7}>
            <h1 className="titulo">Your Profile</h1>

            <Card id="gamerProfile">
              <Image size="medium" src={this.state.avatar} />
              <Card.Content>
                <Card.Header>{this.state.gamerName}</Card.Header>
                <Card.Meta>
                  Player since:{" "}
                  <span className="date">{this.state.signupDate}</span>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="user" />
                  Total games played: {this.state.games.length}
                </a>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={9}>
            <h1 className="titulo">Your games</h1>
            {currentGames.map((g, index) => {
              return (
                <Segment key={index}>
                  <GamesHistory
                    info={"Game played on " + g.time}
                    quizzes={g.game}
                  />
                </Segment>
              );
            })}
            <div id="gamerNewGame">
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
              <div className="saveButton">
                <Link to={"/"}>
                  <Button
                    inverted
                    color="grey"
                    icon
                    size="huge"
                    labelPosition="right"
                    onClick={this.newGame}
                  >
                    New Game<Icon name="repeat" />
                  </Button>
                </Link>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
