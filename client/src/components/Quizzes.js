import React, { Component } from "react";
import Question from "./Question";
import Answers from "./Answers";
import CheckAnswer from "./CheckAnswer";
import moment from "moment";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import {
  Progress,
  Button,
  Icon,
  Segment,
  Modal,
  Header,
  Grid
} from "semantic-ui-react";
import "./Quizzes.css";

export let partida = [];
export let wins = 0;
export let errors = 0;

export class Quizzes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nQuizzes: localStorage.NumberQuizzes, //número de quizzes que el gamer quiere jugar
      quit: false, // salimos de la partida
      game: [], // la partida inicial ordenada
      randomGame: [], // la partida aleatoria
      currentQuiz: 0, //la partida empieza en el quiz en posición 0
      currentAnswers: [], // las respuestas del quiz en cuestion aleatorias
      currentQuestion: "", // la pregunta en función del quiz actual
      selectedAnswer: false, //boleano que controla la respuesta selecionada
      clickedAnswer: "", // la respuesta selecionada
      clickedCorrect: "", // el valor de la respuesta acierto/error
      lastQuiz: false, //control de último quiz para mostrar resultados
      wins: wins, //número de aciertos en la partida
      errors: errors, //número de errores en la partida
      counter: 10, //countdown init
      modalOpen: false, //timeout alert
      reset: this.newGame()
    };
  }
  minusOne = () => {
    this.setState({ counter: this.state.counter - 1 });
    if (this.state.counter <= 0) {
      //clearInterval(this.interval)
      this.setState({ modalOpen: true });
    }
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  newGame = () => {
    partida = [];
    wins = 0;
    errors = 0;
    localStorage.setItem('NumberQuizzes', "")
  };

  resolve = () => {
    localStorage.NumberQuizzes = "";
    this.setState({ quit: true });
  };
  next = () => {
    if (this.state.currentQuiz < this.state.nQuizzes - 1) {
      this.setState({ counter: 10 });
      this.setState({ currentQuiz: this.state.currentQuiz + 1 });
      this.setState({
        currentQuestion: this.state.randomGame[this.state.currentQuiz + 1]
          .question
      });
      this.setState({
        currentAnswers: this.state.randomGame[
          this.state.currentQuiz + 1
        ].answers.sort(() => Math.random() - 0.5)
      });
    } else {
      this.setState({ lastQuiz: true });
    }
    //Guardamos el progreso de la partida
    partida.push({
      question: this.state.currentQuestion,
      answer: this.state.clickedAnswer,
      correct: this.state.clickedCorrect
    });
    this.interval = setInterval(this.minusOne, 1000);
  };

  nextNull = () => {
    if (this.state.currentQuiz < this.state.nQuizzes - 1) {
      this.setState({ counter: 10 });
      this.setState({ currentQuiz: this.state.currentQuiz + 1 });
      this.setState({
        currentQuestion: this.state.randomGame[this.state.currentQuiz + 1]
          .question
      });
      this.setState({
        currentAnswers: this.state.randomGame[
          this.state.currentQuiz + 1
        ].answers.sort(() => Math.random() - 0.5)
      });
    } else {
      this.setState({ lastQuiz: true });
    }
    //Guardamos el progreso de la partida
    partida.push({
      question: this.state.currentQuestion,
      answer: "Time Out. Need to be faster",
      correct: "false"
    });
    //Sumamos un error
    errors++
  };

  selected = e => {
    if (e !== null) {
      clearInterval(this.interval);
      //Recuperamos el evento click de la respuesta seleccionada y la guardamos
      const target = e.target;
      const correct = target.dataset.correct;
      if (correct === "true") {
        wins++;
      }
      if (correct === "false") {
        errors++;
      }
      const val = target.innerText;
      this.setState({ clickedAnswer: val });
      this.setState({ clickedCorrect: correct });

      //Damos estilo según si la respuesta es correcta
      correct === "true"
        ? (target.style.color = "lime")
        : (target.style.color = "red");

      //Recogemos todas las respuestas del dom y damos estilo según data-correct
      const spans = document.getElementsByTagName("span");
      for (let i = 0; i < spans.length; i++) {
        const res = spans[i].getAttribute("data-correct");
        res === "true"
          ? (spans[i].style.color = "lime")
          : (spans[i].style.color = "red");
      }

      //Controlamos el final de la partida
      if (this.state.currentQuiz <= this.state.nQuizzes - 1) {
      } else {
        this.setState({ lastQuiz: true });
      }
    } else {
      clearInterval(this.interval);

      this.setState({ clickedAnswer: "" });
      this.setState({ clickedCorrect: "" });

      //Recogemos todas las respuestas del dom y damos estilo según data-correct
      const spans = document.getElementsByTagName("span");
      for (let i = 0; i < spans.length; i++) {
        const res = spans[i].getAttribute("data-correct");
        res === "true"
          ? (spans[i].style.color = "lime")
          : (spans[i].style.color = "red");
      }

      //Controlamos el final de la partida
      if (this.state.currentQuiz <= this.state.nQuizzes - 1) {
      } else {
        this.setState({ lastQuiz: true });
      }
    }
  };

  SaveGame = () => {
    fetch("http://localhost:3001/api/game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gamerName: localStorage.gamerName,
        playedGame: {
          time: moment().format("llll"),
          game: partida
        }
      })
    })
      .then(res => res.json())
      .then(savedGame => {
        console.log(JSON.stringify(savedGame));
        partida = [];
        wins = 0;
        errors = 0;
      });
  };
  shuffle = a => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  componentDidMount() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authorization", "Bearer " + localStorage.token);
    myHeaders.append("limit", this.state.nQuizzes);
    fetch("http://localhost:3001/api/quiz", {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(quizzes => {
        this.setState({ game: quizzes });
        console.log(quizzes);
        let randomQuizzes = this.shuffle(this.state.game.quizzes);
        this.setState({
          randomGame: randomQuizzes
        });
        this.setState({
          currentQuestion: this.state.randomGame[this.state.currentQuiz]
            .question
        });
        this.setState({
          currentAnswers: this.state.randomGame[
            this.state.currentQuiz
          ].answers.sort(() => Math.random() - 0.5)
        });
        this.setState({ counter: 10 });
        this.interval = setInterval(this.minusOne, 1000);
      });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    wins = 0;
    errors = 0;
  }

  render() {
    if (this.state.quit === true) {
      return <Redirect to="/" />;
    }
    if (this.state.counter > 0) {
      if (this.state.lastQuiz === false) {
        return (
          <div id="quizContainer">
            <Grid>
              <Grid.Row id="currentQuiz">
                <Grid.Column width={10}>
                  <h1 className="App-intro titulo">
                    What does this expression mean?
                  </h1>

                  <Question question={this.state.currentQuestion} />

                  <h1 className="App-intro titulo">
                    Let's see... Could be...{" "}
                  </h1>
                  {this.state.currentAnswers.map((a, index) => (
                    <h1 key={index}>
                      <Answers
                        key={a.answer}
                        answer={a.answer}
                        correct={a.correct}
                        name="selectedAnswer"
                        onClick={this.selected}
                      />
                    </h1>
                  ))}
                  <CheckAnswer next={this.next} quit={this.resolve} />
                </Grid.Column>
                <Grid.Column width={6}>
                  <h1 className="App-intro titulo">Game Progress</h1>
                  <Segment id="gamerProgress">
                    <h1>Remaining time</h1>
                    <Button size="huge" inverted color="grey">
                      {this.state.counter}
                      
                    </Button>
                    <h1>Currently Playing</h1>
                    <Progress
                      value={this.state.currentQuiz + 1}
                      total={this.state.nQuizzes}
                      size="small"
                      progress="ratio"
                      color="grey"
                      active
                    />
                    <h1>Correct responses</h1>
                    <Progress
                      value={wins}
                      total={this.state.nQuizzes}
                      progress="ratio"
                      color="green"
                      size="small"
                      active
                    />
                    <h1>Wrong responses</h1>
                    <Progress
                      value={errors}
                      total={this.state.nQuizzes}
                      progress="ratio"
                      color="red"
                      size="small"
                      active
                    />
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        );
      } else {
        return (
          <div id="gameResults">
            <Grid>
              <Grid.Row>
                <Grid.Column width={10}>
                  <h1 className="titulo">Your played quizzes</h1>
                  {partida.map((a, index) => {
                    if (a.correct === "true") {
                      return (
                        <div className="answersResults" key={a.question}>
                          <Segment color="green" raised>
                            Quiz {index + 1}: {a.question}
                            <h4>Your choice: {a.answer}</h4>
                          </Segment>
                        </div>
                      );
                    } else {
                      return (
                        <div className="answersResults" key={a.question}>
                          <Segment color="red" raised>
                            Quiz {index + 1}: {a.question}
                            <h4>Your choice: {a.answer}</h4>
                          </Segment>
                        </div>
                      );
                    }
                  })}
                </Grid.Column>

                <Grid.Column width={6}>
                  <h1 className="titulo">Your results</h1>
                  <div className="answersResults">
                    <Segment>
                      <h3>Correct responses</h3>
                      <Progress
                        value={wins}
                        total={this.state.nQuizzes}
                        progress="ratio"
                        color="green"
                        size="medium"
                        active
                      />
                      <h3>Wrong responses</h3>
                      <Progress
                        value={errors}
                        total={this.state.nQuizzes}
                        progress="ratio"
                        color="red"
                        size="medium"
                        active
                      />
                    </Segment>
                  </div>
                  <div className="saveButton">
                    <Button
                      inverted
                      color="grey"
                      icon
                      size="huge"
                      labelPosition="right"
                      onClick={this.SaveGame}
                    >
                      Save Game<Icon name="archive" />
                    </Button>
                  </div>
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
                  <div className="saveButton">
                    <Link to={"/gamer"}>
                      <Button
                        inverted
                        color="grey"
                        icon
                        size="huge"
                        labelPosition="right"
                      >
                        Played Games<Icon name="tasks" />
                      </Button>
                    </Link>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        );
      }
    } else {
      if (this.state.lastQuiz === false) {
        return (
          <Modal
            open={this.state.modalOpen}
            onClose={this.handleClose}
            basic
            size="small"
          >
            <Header icon="question" content="Time Out!" />
            <Modal.Content>
              <h1>
                Debes ser más rápido si quieres conseguir algo en la vida...
              </h1>
              <h2>You need to be faster to get things done...</h2>
            </Modal.Content>
            <Modal.Actions>
              <Button color="black" onClick={this.nextNull} inverted>
                <Icon name="checkmark" /> Continúa con el quiz!
              </Button>
            </Modal.Actions>
          </Modal>
        );
      } else {
        return (
          <div id="gameResults">
            <Grid>
              <Grid.Row>
                <Grid.Column width={10}>
                  <h1 className="titulo">Your played quizzes</h1>
                  {partida.map((a, index) => {
                    if (a.correct === "true") {
                      return (
                        <div className="answersResults" key={a.question}>
                          <Segment color="green" raised>
                            Quiz {index + 1}: {a.question}
                            <h4>Your choice: {a.answer}</h4>
                          </Segment>
                        </div>
                      );
                    } else {
                      return (
                        <div className="answersResults" key={a.question}>
                          <Segment color="red" raised>
                            Quiz {index + 1}: {a.question}
                            <h4>Your choice: {a.answer}</h4>
                          </Segment>
                        </div>
                      );
                    }
                  })}
                </Grid.Column>

                <Grid.Column width={6}>
                  <h1 className="titulo">Your results</h1>
                  <div className="answersResults">
                    <Segment>
                      <h3>Correct responses</h3>
                      <Progress
                        value={wins}
                        total={this.state.nQuizzes}
                        progress="ratio"
                        color="green"
                        size="medium"
                        active
                      />
                      <h3>Wrong responses</h3>
                      <Progress
                        value={errors}
                        total={this.state.nQuizzes}
                        progress="ratio"
                        color="red"
                        size="medium"
                        active
                      />
                    </Segment>
                  </div>
                  <div className="saveButton">
                    <Button
                      inverted
                      color="grey"
                      icon
                      size="huge"
                      labelPosition="right"
                      onClick={this.SaveGame}
                    >
                      Save Game<Icon name="archive" />
                    </Button>
                  </div>
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
                  <div className="saveButton">
                    <Link to={"/gamer"}>
                      <Button
                        inverted
                        color="grey"
                        icon
                        size="huge"
                        labelPosition="right"
                      >
                        Played Games<Icon name="tasks" />
                      </Button>
                    </Link>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        );
      }
    }
  }
}
