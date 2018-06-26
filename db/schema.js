const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PokemonSchema = new Schema({
    name: String,
    height: Number,
    Order: Number,
    weight: Number,
    types: [],
    sprites: String,
    moves: [],
    species: []
})

const TeamSchema = new Schema({
    name: String,
    sprites: String,
    pokemon: [PokemonSchema]
})

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true,
        unique: true
    },
    team: [TeamSchema]
})

const PokemonModel = mongoose.model('Pokemon', PokemonSchema)
const TeamModel = mongoose.model('Team', TeamSchema)
const UserModel = mongoose.model('User', UserSchema)

module.exports = {
    PokemonModel,
    TeamModel,
    UserModel
}