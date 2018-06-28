const express = require('express')
const router = express.Router({ mergeParams: true })
const { UserModel } = require('../db/schema')

router.get('/', async (req, res) => {
    const user = await UserModel.findById(req.params.userId)
    const team = await user.team.id(req.params.teamId)
    res.json({
        team
    })
})
router.get('/:pokemonId', async (req, res) => {
    const user = await UserModel.findById(req.params.userId)
    const team = user.team.id(req.params.teamId)
    const pokemonId = req.params.pokemonId
    const pokemon = await team.pokemon.id(pokemonId)
    res.json({
        pokemon
    })
})
router.delete('/:pokemonId', async (req, res) => {
    const user = await UserModel.findById(req.params.userId)
    const team = await user.team.id(req.params.teamId)
    const pokemonId = req.params.pokemonId
    const pokemon = await team.pokemon.id(pokemonId)
    pokemon.remove()
    user.save()
    res.json({
        team
    })
})
module.exports = router