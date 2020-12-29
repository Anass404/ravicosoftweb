var express = require('express');
var router = express.Router();
var model = require("../models/User");
var auth = require("../middleware/auth");
var authorize = require("../middleware/authorize");


router.get("/", auth, authorize(["admin"]), async (req, res, next) => {
  res.redirect('/admin/index')
})

router.get("/index", auth, authorize(["admin"]), async (req, res, next) => {
  var loggedinuser = await model.findById(req.user);
  res.render('./admin/index', { loggedinuser: loggedinuser });
})

router.get("/users", async (req, res, next) => {
  var loggedinuser = await model.findById(req.user);
  var users = await model.find({});
  res.render('./admin/users', { loggedinuser: loggedinuser, model: users });
})

router.get("/userview", async (req, res, next) => {
  try {
    var user;
    if (req.query.id) {
      user = await model.findById(req.query.id)
    }
    else {
      user = { _id: '', fullname: '', username: '', email: '', password: '' }
    }
    var loggedinuser = await model.findById(req.user);
    res.render('./admin/userview', { loggedinuser: loggedinuser, model: user });
  } catch (ex) {
    res.redirect("/admin/users")
  }
})

router.post("/userview", async (req, res, next) => {
  try {
    var user;
    var userid = req.body._id || "";
    var reqbody = {...req.body};
    if(reqbody.businessbookmembershipexpirydate==""){
      delete reqbody.businessbookmembershipexpirydate;
    }
    if(reqbody.smsplanexpirydate==""){
      delete reqbody.smsplanexpirydate;
    }
    if (userid != "") {
      var updateobject = { ...req.body };
      delete updateobject._id;
      user = await model.findByIdAndUpdate(userid, updateobject, { new: true });
    }
    else {
      var updateobject = { ...req.body };
      delete updateobject._id;
      user = await model.create(updateobject);
    }
    res.redirect('/admin/users');
  } catch (ex) {
    console.log(ex)
    res.redirect('/admin/users');
  }
})

router.post("/userviewdeleteloginhistory", async (req, res, next) => {
  try {
    var userid = req.body.userid || "";
    if (userid != "") {
      model.findByIdAndUpdate(userid,{loginhistory:[]}).then()
    }
    res.send({status:"success"})
  } catch (ex) {
    res.redirect('/admin/users');
  }
})


router.get("/test1", async (req, res, next) => {
  var userip = req.headers['cf-connecting-ip'];
  res.send({userip:userip})
})



module.exports = router;
