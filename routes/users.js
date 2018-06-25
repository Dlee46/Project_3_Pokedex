var express = require('express');
var router = express.Router({ mergeParams: true });
const { UserModel } = require('../db/schema')

router.get('/', async (req, res) => {
  const user = await UserModel.find()
  res.json({ user })
})

module.exports = router;
