var express = require('express');
var router = express.Router();


router.get("/", async (req, res, next) => {
  res.redirect('/admin/index')
})
router.get("/index", async (req, res, next) => {
  var loggedinuser = await user.findById(req.user);
  var listings = await listing.find({}).count();
  var projects = await project.find({}).count();
  var users = await user.find({}).count();

  res.render('./admin/index', { data: { listings: listings, projects: projects, users: users }, loggedinuser: loggedinuser });
})

module.exports = router;
