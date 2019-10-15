const express = require('express');
const router = express.Router();
const path = require('path');
const medical_BC_Service = require('../service_bc/medical_bc');
const MongoClient = require('mongodb').MongoClient;

router.get('/attend', function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/html/attend_report.html'));
});

// router.get('/getHistory', function (req, res) {
//     res.sendFile(path.join(__dirname + '/../public/html/getHistoryForNo.html'));
// });

router.get('/searchMyInfo', function (req, res) {
    //console.log(req.session);
    if (req.session.loginedID) {

        res.sendFile(path.join(__dirname + '/../public/html/searchMyInfo.html'));
    } else {
        res.sendFile(path.join(__dirname + '/../public/html/login.html'));
    }
});

router.get('/searchTeamInfo', function (req, res) {
    //console.log(req.session);
    if (req.session.loginedID) {

        res.sendFile(path.join(__dirname + '/../public/html/searchTeamInfo.html'));
    } else {
        res.sendFile(path.join(__dirname + '/../public/html/login.html'));
    }
});

router.get('/nfc', function (req, res) {
    var nfc = req.body.nfc;
    console.log("start", nfc);

    if (nfc) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err);
            } else {
                let UTCtimestamp = parseInt(new Date().toLocaleString());
                UTCtimestamp = UTCtimestamp.getTime() + 1000 * 60 * 60 * 9;
                console.log(UTCtimestamp);

                const send_params = {
                    name: '',
                    timestamp: UTCtimestamp,
                    message: ''
                }
                db = db.db('belief');
                console.log('db connected...ok');
                //query if is this number valid? who is it?(name)
                db.collection('member').findOne({
                    MEMBER_NO: parseInt(nfc)
                }, (err, result) => {
                    medical_BC_Service.attendReportInsert(MEMBER_NO, UTCtimestamp, 1)
                        .then((result) => {
                            if (result == 0) {
                                send_params.message = '퇴근';
                            } else if (result == 1) {
                                send_params.message = '출근';
                            }
                            res.send(JSON.stringify(send_params));
                        })
                });
            }
        });
    } else {
        res.send('nfc값을 입력하세요');
    }
})

router.post('/searchMyInfo', function (req, res, next) {
    var member_no = req.body.member_no;
    console.log("start", member_no);

    if (member_no) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err);
            } else {
                const send_params = {
                    MEMBER_NAME: '',
                    RANK: '',
                    DEPT: '',
                    resultSet: '',
                    FinTotalTime: ''
                }
                db = db.db('belief');
                console.log('db connected...ok');
                //query if is this number valid? who is it?(name)
                db.collection('member').findOne({
                    MEMBER_NO: parseInt(member_no)
                }, async (err, result) => {
                    console.log(result);
                    send_params.MEMBER_NAME = result.MEMBER_NAME;
                    send_params.DEPT = result.DEPT;
                    send_params.RANK = result.RANK;
                    //using member_no, get world state values CHAINCODE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!(QUERY QUERY QUERY QUERY QUERY QUERY QUERY QUERY QUERY QUERY )
                    await medical_BC_Service.getHistoryForNo(member_no)
                        .then(res => {
                            //console.log(res);
                            const stampArr = new Array();  // 타임 스탬프 담기
                            const totalArr = new Array();
                            if (JSON.parse(blockResult)[j]) {
                                // console.log(JSON.parse(blockResult));

                                for (m = 0; m < JSON.parse(blockResult).length; m++) {
                                    stampArr.push((JSON.parse(blockResult)[m].Value.timestamp));

                                }
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        });
                    const calTime = (stampArr) => {
                        let totalTime = 0;
                        for (i = stampArr.length / 2; i > 0; i--) {
                            totalTime += stampArr[2 * i - 1] - stampArr[2 * i - 2];
                        }
                        return totalTime = (totalTime / (1000 * 60));

                    }
                    calTime(stampArr);
                    send_params.FinTotalTime = calTime(stampArr);

                });
            }
        });
    } else {
        res.send('Failure');
    }
});

router.post('/searchTeamInfo', function (req, res, next) {
    var MEMBER_NO = req.session.loginedID;


    // medical_BC_Service.attendReportInsert("10001", "1570674446222", "0");
    // medical_BC_Service.attendReportInsert("10001", "1570674456222", "1");
    // console.log("-----------")
    // medical_BC_Service.attendReportInsert("10001", "1570674543222", "0");
    // console.log("-----------")
    // medical_BC_Service.attendReportInsert("10001", "1570675543222", "1");
    // medical_BC_Service.attendReportInsert("10003", "1570675643222", "0");
    // medical_BC_Service.attendReportInsert("10003", "1570675843222", "1");


    // Check User type Password 
    if (MEMBER_NO) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err);
            } else {
                const send_params = {
                    MEMBER_NAME: '',
                    RANK: '',
                    DEPT: '',
                    resultSet: ''
                }
                db = db.db('belief');
                console.log('db connected...ok');
                // 1. Check password in member DB
                db.collection('member').findOne({
                    "MEMBER_NO": parseInt(MEMBER_NO)
                }, async (err, result) => {
                    send_params.MEMBER_NAME = result.MEMBER_NAME;
                    send_params.DEPT = result.DEPT;
                    send_params.RANK = result.RANK;

                    // 2.Check member in same department
                    await db.collection('member').find({ "DEPT": send_params.DEPT }).toArray(
                        async (err, result) => {
                            //result : All member in same department 


                            // Check User authority 
                            if (send_params.RANK >= 1) {

                                const FinalResultArr = [];
                                const MemberNumForRecord = []; // Number of what we want to find
                                const findResult = [];  // Final result (Result of Entrance Record)
                                let k = 0;
                                console.log("=====", result);

                                for (j = 0; j < result.length; j++) { // 조회할 사람 숫자
                                    //console.log("====Member number to find",result[j].MEMBER_NO)
                                    MemberNumForRecord.push(String(result[j].MEMBER_NO));
                                    const FinalResultObj = {
                                        FinDept: '',
                                        FinNum: '',
                                        FinName: '',
                                        FinTotalTime: ''
                                    }
                                    console.log('----------')

                                    // 3. Find Entrance Record in Blockchain
                                    const stampArr = new Array();  // 타임 스탬프 담기
                                    const totalArr = new Array();
                                    await medical_BC_Service.getHistoryForNo(MemberNumForRecord[j]).then((blockResult) => {
                                        if (JSON.parse(blockResult)[j]) {
                                            // console.log(JSON.parse(blockResult));

                                            for (m = 0; m < JSON.parse(blockResult).length; m++) {
                                                stampArr.push((JSON.parse(blockResult)[m].Value.timestamp));

                                            }
                                        }
                                    })
                                    console.log(stampArr); // 조회한 직원 모든 기록 갯수
                                    console.log('이력 조회 성공');
                                    const calTime = (stampArr) => {
                                        let totalTime = 0;
                                        for (i = stampArr.length / 2; i > 0; i--) {
                                            totalTime += stampArr[2 * i - 1] - stampArr[2 * i - 2];
                                        }
                                        return totalTime = (totalTime / (1000 * 60));

                                    }
                                    calTime(stampArr);
                                    console.log(calTime(stampArr));


                                    FinalResultObj.FinDept = result[j].DEPT;
                                    FinalResultObj.FinName = result[j].MEMBER_NAME;
                                    FinalResultObj.FinNum = result[j].MEMBER_NO;
                                    FinalResultObj.FinTotalTime = calTime(stampArr);

                                    FinalResultArr.push(FinalResultObj);



                                    k++;
                                    if (k == result.length) {

                                        console.log(FinalResultArr)
                                        res.send(JSON.stringify(FinalResultArr));
                                    }
                                }

                            } else {
                                await console.log("DENY");
                            }

                        })
                });


            }//end else        
        });


    } else {
        res.send('id check agian');
    }
});

router.post('/getHistoryCondPost', function (req, res, next) {
    let member_no = req.body.member_no;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;

    if (member_no) {
        medical_BC_Service.getHistoryCond(member_no, startTime, endTime)
            .then(res => {
                console.log('히히 : ', res);
            })
            .catch(err => {
                console.error(err);
            });

        res.send('getHistoryCond OK');
    } else {
        res.send('getHistoryCond Failure');
    }
});

module.exports = router;