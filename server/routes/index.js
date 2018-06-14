'use strict'

const express = require('express')
const quizCtrl = require('../controllers/quiz')
const gamerCtrl = require('../controllers/gamer')
const api = express.Router()
const auth = require('../middlewares/auth')

api.get('/quiz/:quizId',  quizCtrl.getQuiz)
api.get('/quiz', auth, quizCtrl.getQuizzes )
api.post('/quiz', quizCtrl.createQuiz)
api.put('/quiz/:quizId', quizCtrl.updateQuiz)
api.delete('/quiz/:quizId', quizCtrl.deleteQuiz)
api.post('/game', gamerCtrl.saveGame)
api.post('/games', gamerCtrl.fullGame)
api.post('/signup', gamerCtrl.signUp)
api.post('/signin', gamerCtrl.signIn)
api.get('/private', auth, function(req, res) {
    res.status(200).send({ message: `Tienes acceso`})

})

module.exports = api