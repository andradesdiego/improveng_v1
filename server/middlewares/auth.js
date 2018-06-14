"use strict"

const services = require("../services");

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: `No tienes autorización` });
  }

  const token = req.headers.authorization.split(' ')[1];
  services.decodeToken(token).then(response => {
      req.gamer = response
      next()
    })
    .catch(response => {
        console.log('No se ha autorizado el token');
        
      res.status(response.status);
    });
}

module.exports = isAuth;
