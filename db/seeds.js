require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const { PokemonModel, TeamModel, UserModel } = require('./schema')


const pikachu = new PokemonModel({
    name: 'Pikachu',
    height: 0.4,
    type: ['electric'],
    weight: 6
})

const myTeam = new TeamModel({
    name: "team Rocket",
    pokemon: [pikachu]
})

const testUser = new UserModel({
    name: 'Ash',
    userId: 'Test',
    team: [myTeam]
})

UserModel.remove({})
    .then(() => testUser.save())
    .then(() => mongoose.connection.close())
