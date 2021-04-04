var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(
  '<body>\
    <h1>Express</h1>\
    <p>Welcome to Express</p>\
    <script src="/socket.io/socket.io.js"></script>\
    <script>\
      var socket = io();\
    </script>\
  </body>'
  );
});

module.exports = router;
