const express = require('express')
const app = express();
app.set('view engine','ejs');
app.use(express.static("public"));


app.get('/', (req, res) => {
  res.render('index')
});

app.get('/index', (req, res) => {
    res.render('index')
  });
app.get('/about-us', (req, res) => {
    res.render('about-us')
  });
  app.get('/service', (req, res) => {
    res.render('service')
  });
  app.get('/product', (req, res) => {
    res.render('product')
  });
  app.get('/contact', (req, res) => {
    res.render('contact')
  });

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});