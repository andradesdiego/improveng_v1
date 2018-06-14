'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const GamerSchema = new Schema({
    email: { type: String, unique: true, lowercasse: true},
    gamerName: String,
    avatar: String,
    password: { type: String, select: false},
    signupDate: String,
    lastLogin: { type: Date},
    gamesPlayed: Array
})

GamerSchema.pre('save', function (next) {
    if(!this.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err)

        bcrypt.hash(this.password, salt, null, (err, hash) => {
            if(err) return next(err)
            
            this.password = hash
            next()
        })
    })
})

GamerSchema.methods.gravatar = function (size) {
    if(!size){
        size = 800;
    }
    if (!this.email) return `https://gravatar.com/avatar/?s${size}&d=retro`

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s${size}&d=retro`
}

GamerSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch)
    })
}

module.exports = mongoose.model('Gamer', GamerSchema)