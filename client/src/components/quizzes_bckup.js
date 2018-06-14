import React, { Component } from 'react'
import Question from './Question'
import Answers from './Answers'
import CheckAnswer  from './CheckAnswer'
import { Redirect } from "react-router-dom"
import './Quizzes.css'

export default class Quizzes extends Component {
  constructor(props){
    super(props)
    this.state = {
     nQuizzes: localStorage.NumberQuizzes,
     game: [],
     randomGame: [],
     currentQuiz: 0,
     currentAnswers: [],
     currentQuestion: "",
     selectedAnswer: false,
     clickedAnswer: "",
     clickedCorrect: "",
     playedGame: []
    }  
  }

  next = () => {
    this.saveQuiz()
    if (this.state.currentQuiz  < this.state.nQuizzes -1) {
      this.setState({
        currentQuiz: this.state.currentQuiz + 1,
        currentQuestion: this.state.game.quizzes[this.state.currentQuiz + 1].question,
        currentAnswers: this.state.game.quizzes[this.state.currentQuiz + 1].answers
      })
    } else {
      this.setState({
        currentQuiz: this.state.currentQuiz + 1
      })
    }
  }
  quit = () => {
    return true
  }
  resolve = () => {
    const spans = document.getElementsByTagName('span')
    for (let i = 0; i < spans.length; i++) {
      const res = spans[i].getAttribute("data-correct")
      res === "true" ? spans[i].style.color = "lime" : spans[i].style.color = "red"
    }
  }
  selected = (e) => {
      
      const target = e.target
      const correct = target.dataset.correct
      const val = target.innerText
      this.setState({
        clickedAnswer: val
      })
      this.setState({
        clickedCorrect: correct
      })
      this.checkSelected(target, correct)
      this.resolve()
    }
  checkSelected = (target, correct ) => {
    correct === "true" ? target.style.color = "lime" : target.style.color = "red"
  }
  saveQuiz = () => {
    console.log(this.state.currentQuestion)
    console.log(this.state.clickedAnswer)
    console.log(this.state.clickedCorrect)
    StoredGame.push([
      {'question': this.state.currentQuestion}, 
      {'answer': this.state.clickedAnswer}, 
      {'correct': this.state.clickedCorrect}
    ])
    JSON.stringify(localStorage.setItem("playedQuiz", StoredGame))
  }

  componentDidMount(){
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization' , 'Bearer ' + localStorage.token )
    myHeaders.append('limit', this.state.nQuizzes)
    fetch('http://localhost:3001/api/quiz', {
      method: 'GET',
      headers: myHeaders,
    })
      .then(res => res.json())
      .then((quizzes) => {
        this.setState({ game: quizzes })
        this.setState({ randomGame: this.state.game.quizzes.sort(() => Math.random() - 0.5)})
        this.setState({ currentQuestion: this.state.randomGame[this.state.currentQuiz].question })
        this.setState({ currentAnswers: this.state.randomGame[this.state.currentQuiz].answers })
    })
  }

  render(){
    const currentAnswersArray = this.state.currentAnswers
    const randomAnswers = currentAnswersArray.sort(() => Math.random() - 0.5);
    if (this.state.currentQuiz < this.state.nQuizzes ) {
      return(
        <div id="">
          <Question question={this.state.currentQuestion} />
          {randomAnswers.map( a => 
            <Answers 
              key={a.answer} 
              answer={a.answer} 
              correct={a.correct}
              name='selectedAnswer' 
              onClick={this.selected}
            />
          )}
          <CheckAnswer next={this.next} quiet={this.quit} resolve={this.resolve} />
        </div>
      )
    } else {
      return <Redirect to="/game_results" />
    }
  }

}

let StoredGame = [];




//CODIGO ANTERIOR AL REORDENAMIENTO DE LAS RESPUESTAS

// import React, { Component } from 'react'
// import Question from './Question'
// import Answers from './Answers'
// import CheckAnswer  from './CheckAnswer'
// import { Redirect } from "react-router-dom"
// import './Quizzes.css'

// export default class Quizzes extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//      nQuizzes: localStorage.NumberQuizzes,
//      game: [],
//      randomGame: [],
//      currentQuiz: 0,
//      currentAnswers: [],
//      currentQuestion: "",
//      selectedAnswer: false,
//      playedGame: []
//     }  
//   }

//   next = () => {
    
//     if (this.state.currentQuiz  < this.state.nQuizzes -1) {
//       this.setState({
//         currentQuiz: this.state.currentQuiz + 1,
//         currentQuestion: this.state.game.quizzes[this.state.currentQuiz + 1].question,
//         currentAnswers: this.state.game.quizzes[this.state.currentQuiz + 1].answers
//       })
//     } else {
//       this.setState({
//         currentQuiz: this.state.currentQuiz + 1
//       })
//     }
//   }
//   quit = () => {
//     return true
//   }
//   resolve = () => {
//     const spans = document.getElementsByTagName('span')
//     for (let i = 0; i < spans.length; i++) {
//       const res = spans[i].getAttribute("data-correct")
//       res === "true" ? spans[i].style.color = "lime" : spans[i].style.color = "red"
//     }
//   }
//   selected = (e) => {
      
//       const target = e.target
//       const correct = target.dataset.correct
//       this.checkSelected(target, correct)
//       this.resolve()
//     }
//   checkSelected = (target, correct ) => {
//     correct === "true" ? target.style.color = "lime" : target.style.color = "red"
//   }
//   storeQuiz = () => {
//     this.setState({
//       playedGame: {question: this.state.currentQuestion}
//     })
//     console.log(this.state.playedGame.question)
//   }

//   componentDidMount(){
//     let myHeaders = new Headers();
//     myHeaders.append('Content-Type', 'application/json');
//     myHeaders.append('authorization' , 'Bearer ' + localStorage.token )
//     myHeaders.append('limit', this.state.nQuizzes)
//     fetch('http://localhost:3001/api/quiz', {
//       method: 'GET',
//       headers: myHeaders,
//     })
//       .then(res => res.json())
//       .then((quizzes) => {
//         this.setState({ game: quizzes })
//         this.setState({ randomGame: this.state.game.quizzes.sort(() => Math.random() - 0.5)})
//         this.setState({ currentQuestion: this.state.randomGame[this.state.currentQuiz].question })
//         this.setState({ currentAnswers: this.state.randomGame[this.state.currentQuiz].answers })
//     })
//   }

//   render(){
//     const currentAnswersArray = this.state.currentAnswers
//     const randomAnswers = currentAnswersArray.sort(() => Math.random() - 0.5);
//     if (this.state.currentQuiz < this.state.nQuizzes ) {
//       return(
//         <div id="">
//           <Question question={this.state.currentQuestion} />
//           {randomAnswers.map( a => 
//             <Answers 
//               key={a.answer} 
//               answer={a.answer} 
//               correct={a.correct}
//               name='selectedAnswer' 
//               onClick={this.selected}
//             />
//           )}
//           <CheckAnswer next={this.next} quiet={this.quit} resolve={this.resolve} />
//         </div>
//       )
//     } else {
//       return <Redirect to="/game_results" />
//     }
//   }

// }
