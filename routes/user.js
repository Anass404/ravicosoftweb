var express = require('express');
var user = require('../Models/user');
var router = express.Router();



router.get("/index", async (req, res, next) => {
  res.render('./user/index')
})


module.exports = router;