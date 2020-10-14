var express = require('express');
var router = express.Router();
var model = require("../models/User")


router.post('/signin', async (req, res) => {
  var body = req.body;
  var username = body.username;
  var password = body.password;
  var user = await model.findOne({ username: username, password: password, activestatus: { $in: [null, undefined, "active"] } });

  if (user) {
    res.cookie('userid', user._id);
    res.cookie('userrole', user.role);
    if (user.role == "admin") {
      return res.redirect('/admin/index');
    }
    else {
      return res.redirect('/user/index');
    }
  }
  else {
    console.log('user not loggedin')
    return res.redirect('/home/index');
  }
});

router.post('/signout', async (req, res) => {
  res.clearCookie('userid')
  res.clearCookie('userrole')
  return res.redirect('/home/index');
});
module.exports = router;
