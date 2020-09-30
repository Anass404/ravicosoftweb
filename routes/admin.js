var express = require('express');
const { format } = require('express/lib/response');
var router = express.Router();
var model = require("../models/user");
var auth = require("../middleware/auth");
var authorize = require("../middleware/authorize");


router.get("/",auth,authorize(["admin"]), async (req, res, next) => {
  res.redirect('/admin/index')
})
router.get("/index",auth,authorize(["admin"]), async (req, res, next) => {
  var loggedinuser = await model.findById(req.user);
  res.render('./admin/index', { loggedinuser: loggedinuser });
})
// router.get("/businessbook", async (req, res, next) => {
//   var loggedinuser = await model.findById(req.user);
//   res.render('./admin/businessbook', { loggedinuser: loggedinuser });
// })

router.get("/users", async (req, res, next) => {
  var loggedinuser = await model.findById(req.user);
  var users = await model.find({});
  res.render('./admin/users', { loggedinuser: loggedinuser,model:users });
})
router.get('/login', (req, res) => {
  res.render('./admin/login')
});
router.get("/userview", async (req, res, next) => {
  var user;
  if(req.query.id)
  {
    user = await model.findById(req.query.id)
  }
  else{
    user = {_id:'',fullname:'',username:'',email:'',password:''}
  }
  var loggedinuser = await model.findById(req.user);
  res.render('./admin/userview', { loggedinuser: loggedinuser,model:user });
})

router.post("/userview", async (req, res, next) => {
  var user;
  var userid = req.body._id || "";
  if(userid!="")
  {
    var updateobject = {...req.body};
    delete updateobject._id;
    user = await model.findByIdAndUpdate(userid,updateobject,{new:true});
  }
  else{
    var updateobject = {...req.body};
    delete updateobject._id;
    user = await model.create(updateobject);
  }
  var loggedinuser = await model.findById(req.user);
  res.render('./admin/userview', { loggedinuser: loggedinuser,model:user });
})


module.exports = router;
