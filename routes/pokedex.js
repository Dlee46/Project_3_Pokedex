const express = require('express')
const router = express.Router()
const { UserModel, PokedexModel } = require('../db/schema')

router.get('/', function (req, res) {
    const user = UserModel.findById(req.params.userId).then((user) => {
        const pokedex = user.singlePokemon
        res.json({
            pokedex
        })
    })
})

module.exports = router