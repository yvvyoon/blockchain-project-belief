const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/SmartHC';

const express = require('express');
const router = express.Router();
/* insertOne */
// This will be replaced by blockchain
router.post('/', function (req, res, next) {
    var member_no = req.body.member_no;
    console.log("start", member_no);

    if (member_no) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err);
            } else {
                const send_params = {
                    MEMBER_NAME:'',
                    RANK:'',
                    DEPT:'',
                    resultSet:''
                }
                db = db.db('belief');
                console.log('db connected...ok');
                //query if is this number valid? who is it?(name)
                db.collection('member').findOne({
                    MEMBER_NO: parseInt(member_no)
                }, async (err, result) => {
                    console.log(result);
                    send_params.MEMBER_NAME = result.MEMBER_NAME;
                    send_params.DEPT=result.DEPT;
                    send_params.RANK=result.RANK;
                    //using member_no, get world state values CHAINCODE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!(QUERY QUERY QUERY QUERY QUERY QUERY QUERY QUERY QUERY QUERY )
                    await db.collection('Enterance').find({MEMBER_NO: parseInt(member_no)}).toArray(
                        (err, resultSet)=>{
                            if (err) throw err;
                            console.log(resultSet);
                            send_params.resultSet=resultSet;
                            res.send(JSON.stringify(send_params));
                        }
                    )
                });
            }
        });
    } else {
        res.send('Failure');
    }
});

module.exports = router;