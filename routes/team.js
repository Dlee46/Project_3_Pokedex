const express = require('express')
const router = express.Router({ mergeParams: true })
const { UserModel, TeamModel } = require('../db/schema')

router.get('/', async (req, res) => {
    const user = await UserModel.findById(req.params.userId)
    res.json({
        user
    })
})

router.get('/:teamId', async (req, res) => {
    const user = await UserModel.findById(req.params.userId)
    const teamId = req.params.teamId
    const team = user.team.id(teamId)
    res.json({
        team
    })
})

router.post('/', async (req, res) => {
    let user = await UserModel.findById(req.params.userId)
    const newTeam = new TeamModel(req.body)
    user.team.push(newTeam)
    user = await user.save()
    res.json({
        user
    })
})

router.patch('/:teamId', async (req, res) => {
    const user = await UserModel.findById(req.params.userId)
    const team = await user.team.id(req.params.teamId)
    team.name = req.body.name
    team.pokemon = req.body.pokemon
    user.save()
    res.json({
        user
    })
})

router.delete('/:teamId', async (req, res) => {
    const user = await UserModel.findById(req.params.userId)
    const team = await user.team.id(req.params.teamId)
    team.remove()
    user.save()
    res.json({
        user
    })
})

module.exports = router