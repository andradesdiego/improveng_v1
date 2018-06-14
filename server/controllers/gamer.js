'use strict'

const Gamer = require('../models/gamer')
const service = require('../services')

function signUp (req, res) {
    const gamer = new Gamer ({
        email: req.body.email,
        gamerName: req.body.gamerName,
        password: req.body.password,
        signupDate: req.body.signupDate
    })

    gamer.avatar = gamer.gravatar()

    gamer.save((err) => {
        if(err) res.status(500).send({message: `Error al crear el usuario ${err}`})
        return res.status(200).send({ 
            token: service.createToken(gamer),
            gamerName: gamer.gamerName,
            avatar: gamer.avatar
        })
    })
}

const signIn = (req, res) => {
    Gamer.findOne({ email: req.body.email }, (err, gamer) => {
      if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
      if (!gamer) return res.status(404).send({ msg: `no existe el usuario: ${req.body.email}` })
  
      return gamer.comparePassword(req.body.password, (err, isMatch) => {
        if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
        if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` })
  
        req.gamer = gamer
        return res.status(200).send({ 
            msg: 'Te has logueado correctamente', 
            token: service.createToken(gamer), 
            gamer: gamer })
      });
  
    }).select('_id gamerName email +password signupDate avatar gamesPlayed');
  }

const saveGame = (req, res) => {
    //console.log(req.body.gamerName)
    Gamer.findOneAndUpdate({ gamerName: req.body.gamerName}, { $push: { gamesPlayed: req.body.playedGame }} , (err, gamer) => {
        if (err) return res.status(500).send({ msg: `Error al guardar partida: ${err}` })
        if (!gamer) return res.status(404).send({ msg: `no existe el usuario: ${req.body.gamerName}` })

          return res.status(200).send({ 
              msg: 'La partida se ha guardado correctamente',  
              gamesPlayed: Gamer.gamesPlayed })
        });
}

const fullGame = (req, res) => {
    //console.log(req.body.gamerName)
    Gamer.findOne({ gamerName: req.body.gamerName}, (err, gamer) => {
        if (err) return res.status(500).send({ msg: `Error al recoger la partida: ${err}` })
        if (!gamer) return res.status(404).send({ msg: `no existe el usuario: ${req.body.gamerName}` })

          return res.status(200).send({ 
              msg: 'Aquí tienes el histórico de partidas del gamer',  
              gamesPlayed: gamer.gamesPlayed })
        });
}

module.exports = {
    signUp,
    signIn,
    saveGame,
    fullGame
}