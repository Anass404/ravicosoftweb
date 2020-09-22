var express = require('express');
var user = require('../Models/user');
var router = express.Router();


router.get("/", async (req, res, next) => {
  res.redirect('/home/index')
})
router.get("/notfound", async (req, res, next) => {
  res.render('./home/notfound')
})

module.exports = router;