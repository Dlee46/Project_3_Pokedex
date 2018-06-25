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
    species: [],
    team: [{ type: Schema.Types.ObjectId, ref: 'Team' }]
})

const PokedexSchema = new Schema({
    name: String,
    type: [],
    sprites: String,
    singlePokemon: [{ type: Schema.Types.ObjectId, ref: 'Pokemon' }]
})

const TeamSchema = new Schema({
    name: String,
    sprites: String,
    nickname: String
    // singlePokemon: [{ type: Schema.Types.ObjectId, ref: 'Pokemon' }]
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
    poke: [{ type: Schema.Types.ObjectId, ref: 'Pokedex' }],
    team: [{ type: Schema.Types.ObjectId, ref: 'Team' }]
})

const PokedexModel = mongoose.model('Pokedex', PokedexSchema)
const PokemonModel = mongoose.model('Pokemon', PokemonSchema)
const TeamModel = mongoose.model('Team', TeamSchema)
const UserModel = mongoose.model('User', UserSchema)

module.exports = {
    PokemonModel,
    PokedexModel,
    TeamModel,
    UserModel
}