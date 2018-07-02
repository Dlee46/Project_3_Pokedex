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
const teamRouter = require('./routes/team')
const pokemonRouter = require('./routes/pokemon')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/client/build/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html')
})
app.get('/', (req, res) => {
    res.redirect('/api/users')
})

app.use('/api/users', usersRouter);
app.use('/api/users/:userId/team', teamRouter)
app.use('/api/users/:userId/team/:teamId/pokemon', pokemonRouter)


module.exports = app;
