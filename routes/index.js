'use strict';

var express = require('express');
var path = require('path');

var router = express.Router();

router.get('/', function(req, res){
	res.redirect('/login');
})

router.get('/login', function(req, res) {
  if (req.conns.isLoggedIn(req.cookies)) {
    res.redirect('/chat');
  } else {
    res.sendFile(path.join(__dirname, '../views/login.html'));
  }
});

router.get('/chat', function(req, res) {
  if (req.conns.isLoggedIn(req.cookies)) {
    res.render('chat', {username: req.cookies.username});
  } else {
    res.redirect('/login');
  }
});

module.exports = router;