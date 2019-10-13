const express = require('express');
const router = express.Router();
const path = require('path');
const medical_BC_Service = require('../service_bc/medical_bc');

router.get('/attend', function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/html/attend_report.html'));
});

router.get('/getHistory', function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/html/getHistoryForNo.html'));
});

router.get('/getHistoryCond', function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/html/getHistoryCond.html'));
});

router.post('/attendFormInsertOne', function (req, res, next) {
    let member_no = req.body.member_no;
    let timestamp = req.body.timestamp;
    let status = req.body.status;
    
    if (member_no) {
        medical_BC_Service.attendReportInsert(member_no, timestamp, status);

        res.send('attendFormInsertOne OK');
    } else {
        res.send('attendFormInsertOne Failure');
    }
});

router.post('/getHistoryForNo', function (req, res, next) {
    let member_no = req.body.member_no;

    if (member_no) {
        medical_BC_Service.getHistoryForNo(member_no)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            });
        
        res.send('getHistoryForNo OK');
    } else {
        res.send('getHistoryForNo Failure');
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