const express = require('express');
const router = express.Router();
const path = require('path');
const medical_DB_Service=require('../service_db/medical_db');
const medical_BC_Service=require('../service_bc/medical_bc');

/* medical_report_req */
router.get('/medical_report_req', function (req, res) {    
    //console.log(req.session);
    if(req.session.loginedID){
        
      res.sendFile(path.join(__dirname+'/../public/html/medical_report.html'));
    }else{
      res.sendFile(path.join(__dirname+'/../public/html/login.html'));
    }
  });

/* medicalFormInsertOne */
router.post('/medicalFormInsertOne', function(req, res, next) {
    var pcode=req.body.pcode;  
    var name=req.body.name;
    var ssn=req.body.ssn;
    var addr=req.body.addr;
    var email=req.body.email;
    var visitDate=req.body.visitDate;
    var desease=req.body.desease;
    var deseaseCode=req.body.deseaseCode;
    var content=req.body.content;
    var docterName=req.session.loginedName;
    var docterNo=req.session.loginedID;
    //console.log(pcode,name,ssn,addr,email,visitDate,desease,deseaseCode,content,docterName,docterNo);
    if(name && ssn){
        medical_DB_Service.medicalReportInsert(pcode,name,ssn,addr,email,visitDate,desease,deseaseCode,content);
        
        medical_BC_Service.medicalReportInsert(pcode,name,ssn,addr,email,visitDate,desease,deseaseCode,content,docterName,docterNo);
        
        res.send('ok');
        
    }else{
        res.send('Failure');
    } 
});

module.exports=router;
 