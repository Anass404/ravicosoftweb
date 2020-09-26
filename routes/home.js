var express = require('express');
var user = require('../Models/user');
var router = express.Router();



router.get("/index", async (req, res, next) => {
  res.render('./home/index')
})
router.get("/login", async (req, res, next) => {
  res.render('./home/login')
})
router.get('/about-us', (req, res) => {
  res.render('./home/about-us')
});
router.get('/service', (req, res) => {
  res.render('./home/service')
});
router.get('/product', (req, res) => {
  res.render('./home/product')
});
router.get('/contact', (req, res) => {
  res.render('./home/contact')
});
router.get('/product/businessbook', (req, res) => {
  res.render('./home/businessbook')
});
router.get('/sms', (req, res) => {
  res.render('./home/sms')
});
router.get("/notfound", async (req, res, next) => {
  res.render('./home/notfound')
})

router.get("/", async (req, res, next) => {
  res.redirect('./home/index')
})

module.exports = router;