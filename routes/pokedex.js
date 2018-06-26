const express = require('express')
const router = express.Router({ mergeParams: true })
const { UserModel } = require('../db/schema')

router.get('/', async (req, res) => {
    let user = await UserModel.findById(req.params.userId)
        .populate({
            path: 'poke',
            populate: { path: 'singlePokemon' }
        })
    console.log(user)
    const pokedex = user.pokedex
    res.json({
        pokedex
    })
    console.log(req.params.userId)
})

router.get('/:id', async (req, res) => {
    const user = await UserModel.findById(req.params.userId)
    const pokemonId = req.params.id
    const pokemon = user.pokedex.id(pokemonId)
    res.json({
        pokemon
    })
})

module.exports = router