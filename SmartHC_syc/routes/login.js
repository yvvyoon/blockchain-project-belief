const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/SmartHC';

const express = require('express');
const router = express.Router();

/* login */
router.post('/', function (req, res, next) {
    var MEMBER_NO = req.body.MEMBER_NO;
    var PASSWORD = req.body.PASSWORD;
    console.log(MEMBER_NO, PASSWORD);
    if (MEMBER_NO && PASSWORD) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err);
            } else {
                db = db.db('belief');
                console.log('db connected...ok');
                db.collection('member').findOne(
                    {
                        "MEMBER_NO": parseInt(MEMBER_NO),
                        "PASSWORD": PASSWORD
                    },
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('로그인 ok');
                            console.log(result);
                            req.session.loginedMEMBER_NO = MEMBER_NO;
                            req.session.loginedName = result.MEMBER_NAME;
                            res.send(req.session.loginedName + '님 로그인되셨습니다');
                        }
                    }
                );
            }//end else        
        });
    } else {
        res.send('id와 pw를 입력하세요');
    }
});

module.exports = router;