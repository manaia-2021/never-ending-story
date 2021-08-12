const express = require('express');
const hbs = require('express-handlebars');
const routes = require('./routes');

const server = express();

// Server configuration
server.use(express.static('public'));
server.use(express.urlencoded({ extended: false }));

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }));
server.set('view engine', 'hbs');

// Your routes/router(s) should go here
server.use('/', routes);

server.get ('/', (req, res) =>{
  const template = 'home'
  getData((err, initialData) =>{
    res.render(template, initialData)
  })
})

// server.get ('/', (req, res) =>{
//   res.render ('home')
// })



module.exports = server;
