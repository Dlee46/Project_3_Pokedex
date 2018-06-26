const express = require('express')
const router = express.Router({ mergeParams: true })
const { UserModel } = require('../db/schema')

router.get('/', async (req, res) => {
    let user = await UserModel.findById(req.params.userId)
        .populate({
            path: 'pokedex',
            populate: { path: 'pokemon' }
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
        .populate({
            path: 'pokedex',
            populate: {
                path: 'pokemon',
                select: '_id'
            }
        })
    const pokedex = user.pokedex._id
    res.json({
        pokedex
    })
})

module.exports = router