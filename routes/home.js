var express = require('express');
var router = express.Router();



router.get("/index", async (req, res, next) => {
  res.render('./home/index.ejs')
})
router.get("/login", async (req, res, next) => {
  res.render('./home/login.ejs')
})
router.get('/about-us', (req, res) => {
  res.render('./home/about-us.ejs')
});
router.get('/service', (req, res) => {
  res.render('./home/service.ejs')
});
router.get('/product', (req, res) => {
  res.render('./home/product.ejs')
});
router.get('/contact', (req, res) => {
  res.render('./home/contact.ejs')
});
router.get('/businessbook', (req, res) => {
  res.render('./home/businessbook.ejs')
});
router.get('/sms', (req, res) => {
  res.render('./home/sms.ejs')
});
router.get("/notfound", async (req, res, next) => {
  res.render('./home/notfound.ejs')
})

router.get("/", async (req, res, next) => {
  res.redirect('./home/index.ejs')
})

module.exports = router;