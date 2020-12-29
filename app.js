
// #region variables 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var engine = require('ejs-locals')

app.use(express.static('public'));


var auth = require('./routes/auth');
var admin = require('./routes/admin');
var home = require('./routes/home');
var userroute = require('./routes/user');
var businessbookapi = require('./routes/businessbookapi');


var mongoose = require("mongoose")
var user = require('./models/User')
mongoose.connect('mongodb://localhost:27017/ravicosoft', {
  useNewUrlParser: true,useUnifiedTopology: true
});

var app = express();
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(bodyParser.json({
  limit: '100mb'
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  limit: '100mb',
  extended: true
}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, PATCH, OPTIONS,DELETE");
  next()
});
app.use(express.static("public"));

dbsetting();
async function dbsetting() {
  //await user.remove({});
  var adminuser  = await user.findOne({username: 'admin',role: 'admin'});
  if(!adminuser){
    await user.create({
      activestatus: 'active',
      password: "admin@123",
      profileimage: "/uploads/defaultprofileimage.png",
      role: 'admin',
      username: 'admin',
    })
  }
  var testuser  = await user.findOne({username: 'testuser',role: 'user'});
  if(!testuser){
    await user.create({
      activestatus: 'active',
      password: "admin@123",
      profileimage: "/uploads/defaultprofileimage.png",
      role: 'user',
      username: 'testuser',
    })
  }
}

app.use('/auth', auth);
app.use('/admin', admin);
app.use('/home', home);
app.use('/user', userroute);
app.use('/api/businessbookapi', businessbookapi);

app.get('/', (req, res) => {
  res.redirect("/home/index")
});


module.exports = app;