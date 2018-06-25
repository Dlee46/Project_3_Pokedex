var express = require('express');
var router = express.Router({ mergeParams: true });
const { UserModel } = require('../db/schema')

router.get('/', async (req, res) => {
  const user = await UserModel.find()
  res.json({ user })
})
router.get('/:id', async (req, res) => {
  const user = await UserModel.findById(req.params.id)
  res.json({
    user
  }).catch((err) => {
    res.json(err)
  })
})
router.post('/', (req, res) => {
  const newUser = new UserModel(req.body)
  newUser.save().then((user) => {
    res.json(user)
  })
})
module.exports = router;
