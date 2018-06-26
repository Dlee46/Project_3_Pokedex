require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const { PokedexModel, PokemonModel, TeamModel, UserModel } = require('./schema')


const pikachu = new PokemonModel({
    name: 'Pikachu',
    height: 0.4,
    type: ['electric'],
    weight: 6
})

const myTeam = new TeamModel({
    name: "team Rocket",
    pokemon: [pikachu._id]
})

const bulbapedia = new PokedexModel({
    pokemon: [pikachu._id]
})

const testUser = new UserModel({
    name: 'Ash',
    userId: 'Test',
    pokedex: [bulbapedia._id],
    team: [myTeam._id]
})

seed = async () => {
    await PokedexModel.remove()
    await UserModel.remove()
    await TeamModel.remove()
    await PokemonModel.remove()


    const pokemon = await pikachu.save()
    console.log('Pika Pika', pokemon)

    const team = await myTeam.save()
    console.log("Team Saved!", team)

    const pokedex = await bulbapedia.save()
    console.log("pokedex Saved!", pokedex)

    const user = await testUser.save()
    console.log('User Saved', user)


    mongoose.connection.close()
}

seed()
