var express = require('express');
var router = express.Router();
var cors = require('cors');
router.use(cors());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    name: '홍길동',
    time: '8시 30분',
    type: '출근'
 });
});

module.exports = router;
