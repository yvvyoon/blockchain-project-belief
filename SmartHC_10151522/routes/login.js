const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/SmartHC';

const express = require('express');
const router = express.Router();
var cors = require('cors');
router.use(cors());


/* login */
router.get('/', function (req, res, next) {
    var id = req.query.id;
    var pw = req.query.pw;
    console.log(id, pw);
    if (id && pw) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err);
            } else {
                db = db.db('belief');
                console.log('db connected...ok');
                db.collection('member').findOne(
                    {
                        "MEMBER_NO": parseInt(id),
                        "PASSWORD": pw
                    },
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            if (result != null) {
                                console.log('로그인 ok');
                                console.log(result);
                                req.session.loginedID = id;
                                req.session.loginedName = result.MEMBER_NAME;
                                const send_params = {
                                    name: result.MEMBER_NAME,
                                    admin: result.RANK,
                                    dept: result.DEPT
                                }
                                console.log(send_params);
                                res.send(JSON.stringify(send_params));
                            }else{
                                res.send('id 또는 패스워드가 잘 못 되었습니다. 다시 입력해주세요');
                            }
                        }
                    }
                );
            }//end else        
        });
    } else {
        res.send('id와 pw를 입력하세요');
    }
});

/* insertOne */
router.post('/insertOne', function (req, res, next) {
    var name = req.body.name;
    var id = req.body.id;
    var pw = req.body.pw;
    var message = req.body.message;
    //console.log(name,id,pw,message);
    if (name && id && pw) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err);
            } else {
                db = db.db('SmartHC');
                console.log('db connected...ok');
                db.collection('contactForm').insertOne(
                    {
                        "name": name,
                        "id": id,
                        "pw": pw,
                        "message": message
                    },
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('메세지 저장됨\n');
                            //console.log(result);
                            res.send('회원 가입되셨습니다');
                        }
                    }
                );
            }
        });
    } else {
        res.send('Failure');
    }
});

module.exports = router;