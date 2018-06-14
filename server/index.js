//'use strict'

const app = require('./app')

const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
    if (err) throw err
    console.log('Conexión a base de datos useful_english establecida')
    
    app.listen(config.port, () => {
        console.log(`API REST corriendo en http://localhost:${config.port}`)
    })
})
