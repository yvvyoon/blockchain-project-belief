const express = require('express');
const router = express.Router();
const path = require('path');
const medical_BC_Service = require('../service_bc/medical_bc');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/SmartHC';

var cors = require('cors');
router.use(cors());
let k = 0;

const timeConvertDay = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month +  ' ';
    return time;
  }
  const timeConvertTime = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp);
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = hour+"시 "+min+"분 "+sec+"초";
    return time;
  }
  const calTime = (FinalResultArr) => {
    let totalTime = 0;
    for (i = FinalResultArr.length / 2; i > 0; i--) {
        totalTime += FinalResultArr[2 * i - 1] - FinalResultArr[2 * i - 2];
    }
    return totalTime = (totalTime / (1000 * 60));
}
router.get('/', function (req, res) {
    const member_no = req.query.id;
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

                db.collection('member').findOne({
                    MEMBER_NO: parseInt(member_no)
                }, async (err, result) => {
                    send_params.MEMBER_NAME = result.MEMBER_NAME;
                    send_params.DEPT = result.DEPT;
                    send_params.RANK = result.RANK;
                    await medical_BC_Service.getHistoryForNo(member_no)
                        .then(blockResult => {
                            const FinalResultArr = new Array();  // 타임 스탬프 담기
                            const totalArr = new Array();
                            if (JSON.parse(blockResult)[0]) {
                                for (let m = 0; m < (JSON.parse(blockResult).length); m++) {
                                    let FinalResultObj =  {
                                        id : member_no,
                                        date : '',
                                        time : '',
                                        type : '',
                                        totalTime:''
                                    }
                                    FinalResultObj.id = member_no;
                                    FinalResultObj.date = timeConvertDay(parseInt(JSON.parse(blockResult)[m].Value.timestamp));
                                    FinalResultObj.time = timeConvertTime(parseInt(JSON.parse(blockResult)[m].Value.timestamp));
                                    FinalResultObj.type = ((JSON.parse(blockResult))[m].Value.status == "0")?"퇴근":"출근";

                                    totalArr.push(FinalResultObj);
                                    FinalResultArr.push((JSON.parse(blockResult)[m].Value.timestamp));
                                }
                                calTime(FinalResultArr);
                                
                                res.send({ totalArr });
                            } else {
                                let FinalResultObj =  {
                                    id : member_no,
                                    date : '',
                                    time : '',
                                    type : "근무 기록이 없습니다",
                                    totalTime:''
                                }
                                totalArr.push(FinalResultObj);
                                res.send({ totalArr });
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        });
                });

                
            }
        });
    } else {
        res.send('Failure');
    }

});

module.exports = router;


