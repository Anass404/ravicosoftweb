var express = require('express');
var user = require('../Models/user');
var router = express.Router();



router.get("/index", async (req, res, next) => {
  res.render('./user/index')
})
router.get("/smsplan", async (req, res, next) => {
  res.render('./user/smsplan')
})
router.get("/login", async (req, res, next) => {
  res.render('./user/login')
})


module.exports = router;