const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/SmartHC';

const express = require('express');
const router = express.Router();
/* insertOne */
// This will be replaced by blockchain
router.post('/', function (req, res, next) {
    var nfc = req.body.nfc;
    console.log("start", nfc);

    if (nfc) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err);
            } else {
                let UTCtimestamp=parseInt(new Date().toLocaleString());

                //UTCtimestamp = UTCtimestamp.getTime()+1000*60*60*9;
                console.log(UTCtimestamp);
                const send_params = {
                    name: '',
                    hour:UTCtimestamp,
                    minute:UTCtimestamp,
                    message: ''
                }
                db = db.db('belief');
                console.log('db connected...ok');
                //query if is this number valid? who is it?(name)
                db.collection('member').findOne({
                    MEMBER_NO: parseInt(nfc)
                }, (err, result) => {
                    console.log(result);
                    send_params.name = result.MEMBER_NAME;
                    //using nfc, get world state values CHAINCODE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!(QUERY QUERY QUERY QUERY QUERY QUERY QUERY QUERY QUERY QUERY )
                    db.collection('temp').findOne({
                        MEMBER_NO: parseInt(nfc)
                    }, (err, result1) => {
                        if (result1.STATUS == 0) {
                            send_params.message = 'Chul-Guen';
                            //CHAINCODE(INVOKE INVOKE INVOKE INVOKE INVOKE INVOKE INVOKE INVOKE INVOKE INVOKE INVOKE INVOKE INVOKE )
                            db.collection('temp').updateOne({
                                MEMBER_NO: parseInt(nfc)
                            }, { $set: { STATUS: 1 } },
                                (err, result2) => {
                                    //if updating world state occurs, blockchain data will be autometically updated 
                                    db.collection('Enterance').save({
                                        MEMBER_NO: parseInt(nfc),
                                        timestamp: UTCtimestamp,
                                        status: result1.STATUS
                                    }, (err) => {
                                        console.log(send_params);
                                        res.send(JSON.stringify(send_params));
                                    })
                                });
                        } else {
                            send_params.message = 'Toi-Guen';
                            db.collection('temp').updateOne({
                                MEMBER_NO: parseInt(nfc)
                            }, { $set: { STATUS: 0 } },
                                (err, result2) => {
                                    db.collection('Enterance').save({
                                        MEMBER_NO: parseInt(nfc),
                                        timestamp: UTCtimestamp,
                                        status: result1.STATUS
                                    }, (err) => {
                                        console.log(send_params);
                                        res.send(JSON.stringify(send_params));

                                    })
                                });
                        }
                    });
                });
            }
        });
    } else {
        res.send('Failure');
    }
});

module.exports = router;