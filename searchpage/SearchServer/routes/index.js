var express = require('express');
var router = express.Router();
var cors = require('cors');
router.use(cors());

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('users12345678 : ', req.session.name);
  res.json({
    name: req.session.name,
    time: req.session.time,
    type: req.session.type
  });
  console.log('users12345678 : ', req.session.name);
});

module.exports = router;
