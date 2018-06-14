'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuizSchema = new Schema ({
    question: String,
    answers: []
})
module.exports = mongoose.model('Quiz', QuizSchema)