var express = require('express');
var router = express.Router();
var Timelog = require('../models').Timelog;
var cors = require('cors');
router.use(cors());

router.get('/', function (req, res, next) {
  Timelog.findAll({
     where: {
      number: req.query.result
    }
  })
    .then((Timelog) => {
      console.log(Timelog);
       res.json({
        Timelogs: Timelog
      });
    })
    .catch((err) => {
      console.error(err);
    })
});

module.exports = router;
