const express = require('express')
const router = express.Router({ mergeParams: true })
const { UserModel, TeamModel } = require('../db/schema')

router.get('/', async (req, res) => {
    const user = await UserModel.find()
    res.json({
        user
    })
})

router.get('/:id', async (req, res) => {
    const user = await UserModel.find()
    const pokemonId = req.params.id
    const pokemon = user.team.id(pokemonId)
    res.json({
        pokemon
    })
})

router.post('/', async (req, res) => {
    const newTeam = await new TeamModel(req.body)
    newTeam.save()
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