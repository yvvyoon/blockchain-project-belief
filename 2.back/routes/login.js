const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://70.12.229.178:27017/SmartHC';

const express = require('express');
const router = express.Router();
var cors = require('cors');
router.use(cors());


/* login */
router.get('/', function (req, res, next) {
    var id = req.query.id;
    var pw = req.query.pw;
    if (id && pw) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) {
                console.log(err);
            } else {
                db = db.db('belief');
                console.log('db connected...ok');
                try {
                    db.collection('member').findOne(
                        {
                            "MEMBER_NO": parseInt(id),
                            "PASSWORD": pw
                        },
                        (err, result) => {
                            console.log(result);
                            if (!result) {
                                console.log(err)
                            } else {
                                if (result == null) {

                                    const send_params = {
                                        name: '',
                                        admin: '',
                                        dept: '',
                                    }
                                    console.log("몽고디비 결과가 null입니다.");
                                    res.send(JSON.stringify(send_params));
                                } else {
                                    console.log('로그인 ok');
                                    console.log(result);
                                    req.session.loginedID = id;
                                    req.session.loginedName = result.MEMBER_NAME;
                                    const send_params = {
                                        name: result.MEMBER_NAME,
                                        admin: result.RANK,
                                        dept: result.DEPT
                                    }
                                    //console.log(send_params);
                                    res.send(JSON.stringify(send_params));

                                }
                            }
                        }
                    );
                } catch (err) {
                    const send_params = {
                        name: 'aaa',
                        admin: 'aaa',
                        dept: 'aaa',
                    }
                    console.log('ID 또는 패스워드가 잘 못 되었습니다.')
                    res.send(JSON.stringify(send_params));
                }
            }//end else        
        });
    } else {
        res.send('id와 pw를 입력하세요');
    }
});

module.exports = router;
