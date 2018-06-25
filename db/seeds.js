require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const { PokedexModel, PokemonModel, TeamModel, UserModel } = require('./schema')

const myTeam = new TeamModel({
    name: "team Rocket",
    // singlePokemon: [pikachu._id]
})
const pikachu = new PokemonModel({
    name: 'Pikachu',
    height: 0.4,
    type: ['electric'],
    weight: 6,
    team: [myTeam._id]
})

const bulbapedia = new PokedexModel({
    singlePokemon: [pikachu._id]
})



const testUser = new UserModel({
    name: 'Ash',
    userId: 'Test',
    poke: [bulbapedia._id],
    team: [myTeam._id]
})

PokedexModel.remove().then(() => {
    return UserModel.remove()
}).then(() => {
    return TeamModel.remove()
}).then(() => {
    return PokemonModel.remove()
})
    .then(() => {
        myTeam.save((err) => {
            if (err) return console.log(err)

            testUser.save(function (err) {
                if (err) return console.log(err)

                pikachu.save()
                    .then(() => {
                        PokemonModel
                            .findOne({ name: 'Pikachu' })
                            .populate('team')
                            .exec(function (err, pokemon) {
                                if (err) return console.log(err)
                                console.log(pokemon)

                            })

                    })

            })
        })

    })
