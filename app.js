require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
const connection = mongoose.connection
connection.on('connected', () => {
    console.log('Mongoose Connected!')
})
connection.on('error', (err) => {
    console.log('Mongoose Error: ' + err)
})
const usersRouter = require('./routes/users');
const pokedexRouter = require('./routes/pokedex')
const teamRouter = require('./routes/team')
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/client/build/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html')
})

app.use('/api/users', usersRouter);
app.use('/api/users/:userId/pokedex', pokedexRouter)
app.use('/api/users/:userId/team', teamRouter)

module.exports = app;
