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
       res.json({
        name: users[0].name,
        admin: users[0].admin
      });
    })
    .catch((err) => {
      console.error(err);
    })
});

module.exports = router;
