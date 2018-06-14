'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Quiz = require('../models/quiz')
const random = require('mongoose-simple-random')

let s = new Schema({
    message: String
  });
s.plugin(random);

let getQuizzes = ((req, res) => {
    let limite = req.headers.limit
    //console.log('el limite antes de la consulta es ' + limite)
    // Quiz.find({}, {}, {limit: parseInt(limite)}, (err, quizzes) => {
    //     if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    //     if(!quizzes) return res.status(404).send({message: `No hay quizzes`})

    //     res.status(200).send({ quizzes })
    // })
    Quiz.find({}, (err, quizzes) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!quizzes) return res.status(404).send({message: `No hay quizzes`})

        res.status(200).send({ quizzes })
    })
})

let getQuiz = ((req, res) => {
    let quizId = req.params.quizId
    console.log(quizId)
    Quiz.findById(quizId, (err, quiz) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!quiz) return res.status(404).send({message: `El quiz no existe`})

        res.status(200).send({ quiz })
    })
}) 

let createQuiz = ((req, res) => {
    let quiz = new Quiz()
    quiz.question = req.body.question
    quiz.answers = req.body.answers
    // quiz.answers = [
    //     {
    //         answer: req.body.answers[0].answer,
    //         correct: req.body.answers[0].correct
    //     },
    //     {
    //         answer: req.body.answers[1].answer,
    //         correct: req.body.answers[1].correct
    //     },
    //     {
    //         answer: req.body.answers[2].answer,
    //         correct: req.body.answers[2].correct
    //     }
    // ]

    quiz.save((err, quizStored) => {
        if(err) res.status(500).send({message: `error al salvar en bbdd ${err}`})

        res.status(200).send({ quizStored })
    })
}) 

let updateQuiz = ((req, res) => {
    let quizId = req.params.quizId
    let quizBody = req.body
    Quiz.findByIdAndUpdate(quizId, quizBody, (err, quiz) => {
        if(err) res.status(500).send({ message: `Error al modificar el quiz ${err}`})
            
        res.status(200).send({ quiz })
    })
}) 

let deleteQuiz = ((req, res) => {
    let quizId = req.params.quizId
    Quiz.findByIdAndRemove(quizId, (err, quiz) => {
        if(err) return res.status(500).send({message: `Error al borrar el quiz ${err}`})

        quiz.remove(err => {
            if(err) return res.status(500).send({ message: `Error al borrar el quiz ${err}`})
            res.status(200).send({message: `Quiz borrado con éxito`})
        })  
    })
})

module.exports = {
    getQuiz,
    getQuizzes,
    createQuiz,
    updateQuiz,
    deleteQuiz
}