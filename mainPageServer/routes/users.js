var express = require('express');
var router = express.Router();
var User = require('../models').User;
var cors = require('cors');
router.use(cors());

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.findAll({
    where: {
      number: req.query.result
    }
  })
    .then((users) => {
      req.session.result = JSON.stringify(users);
      console.log('req.session.result : ', req.session.result);
      let result = req.session.result;
      let result2 = JSON.parse(result)[0];
       req.session.name = result2.name,
       req.session.time = result2.time,
       req.session.type = result2.number
       console.log('req.session.name : ', req.session.name);
       res.json({
        name: req.session.name,
        time: req.session.time,
        type: req.session.type
      });
    })
    .catch((err) => {
      console.error(err);
    })
});

module.exports = router;
