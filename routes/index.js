const { response } = require('express');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'momenta-frontend/build', 'index.html'));
});

module.exports = router;
