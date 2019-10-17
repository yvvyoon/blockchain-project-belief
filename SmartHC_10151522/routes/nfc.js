const express = require('express');
const router = express.Router();
const path = require('path');
const medical_BC_Service = require('../service_bc/medical_bc');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://70.12.229.178:27017/SmartHC';


router.get('/', function (req, res) {
    //var member_no = req.query.result;
    var member_no=req.query.result;
    console.log("start", member_no);

    if (member_no) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err);
            } else {
                let UTCtimestamp = parseInt(new Date().getTime().toString());
                //UTCtimestamp = UTCtimestamp + 1000 * 60 * 60 * 9;

                console.log(UTCtimestamp);

                let send_params = {
                    name: '',
                    time: '',
                    message: ''
                }
                db = db.db('belief');
                console.log('db connected...ok');
                //query if is this number valid? who is it?(name)
                console.log(member_no);
                db.collection('member').findOne({
                    MEMBER_NO: parseInt(member_no)
                }, (err, mongoResult) => {
                    console.log(mongoResult);
                    send_params.name=mongoResult.MEMBER_NAME;
                    medical_BC_Service.attendReportInsert(member_no, UTCtimestamp.toString(), '1')
                    .then(() => {
                        console.log('***** attendReportInsert Success *****');
        
                        medical_BC_Service.getWorldState(member_no)
                            .then((result) => {
                                console.log('***** getWorldState Success *****');
                                let status=JSON.parse(result).status;
                                let timestamp=JSON.parse(result).timestamp;
                                console.log('status is ', status);
                                console.log('timestamp is ', timestamp);

                                //timestamp= (timestamp%31556926)%86400;
                                //timestamp= `${timestamp/3600}시 ${timestamp%3600}분`
                                //console.log('timestamp is ', timestamp);
                                const hours=new Date().getHours();
                                const min=new Date().getMinutes();
                                const time = `${hours}시 ${min}분`;
                                send_params.time=time;

                                if(status=='1'){
                                    send_params.message='출근';
                                    
                                }else{
                                    send_params.message='퇴근';
                                }
                                res.send(JSON.stringify(send_params));
                            })
                            .catch(err => {
                                console.log('***** getWorldState 에러 *****');
                                console.error(err);
                            });
                    })
                    .catch(err => {
                        console.log('***** attendReportInsert 에러 *****');
                        console.error(err);
                    });
                });
            }
        });
    } else {
        res.send('member_no값을 입력하세요');
    }
})


module.exports = router;