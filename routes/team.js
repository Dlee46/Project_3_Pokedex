const express = require('express')
const router = express.Router({ mergeParams: true })
const { UserModel, TeamModel } = require('../db/schema')

router.get('/', async (req, res) => {
    const user = await UserModel.findById(req.params.userId)
        .populate({
            path: 'team',
            populate: { path: 'pokemon' }
        })
    const team = user.team
    res.json({
        team
    })
})

router.get('/:id', async (req, res) => {
    const user = await UserModel.find()
    const pokemonId = req.params._id
    const pokemon = user.team.id(pokemonId)
    res.json({
        pokemon
    })
})

router.post('/', async (req, res) => {
    const user = await UserModel.findById(req.params.userId)
    const newTeam = await new TeamModel(req.body)
    user.pokemon.push(newTeam)
    user.save()
    res.json({
        newTeam
    })
})

router.patch('/:id', async (req, res) => {
    const teamId = req.params.id
    const updateTeam = req.body
    const team = await UserModel.findByIdAndUpdate(teamId, updateTeam)
    res.json({
        team
    })
})

router.delete('/:id', async (req, res) => {
    await UserModel.findByIdAndRemove(req.params.id)
    res.redirect(`/team`)
})

module.exports = router