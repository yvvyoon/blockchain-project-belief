var express = require('express');
var router = express.Router();
var Admin = require('../models').Admin;
var cors = require('cors');
router.use(cors());

/* GET Admins listing. */
router.get('/', function (req, res, next) {
  Admin.findAll({
    /* where: {
      number: req.query.result
    } */
  })
  .then((Admin) => {
    console.log(Admin);
     res.json({
      Admins: Admin
    });
  })
  .catch((err) => {
    console.error(err);
  })
});

module.exports = router;
