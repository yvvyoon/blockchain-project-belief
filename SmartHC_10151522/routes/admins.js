const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/SmartHC';
const medical_BC_Service = require('../service_bc/medical_bc');

const express = require('express');
const router = express.Router();

var cors = require('cors');
router.use(cors());

/* insertOne */
// This will be replaced by blockchain

router.get('/', function (req, res, next) {
    console.log("@@@@@@@@@@@@@@@@여기서 부터 하기");
    let aaaa = req.query.rank;
    console.log("asdasdasdasd:",aaaa);
    
    // medical_BC_Service.attendReportInsert("10001", "1570674446222", "0");
    // medical_BC_Service.attendReportInsert("10001", "1570674456222", "1");
    // console.log("-----------")
    // medical_BC_Service.attendReportInsert("10001", "1570674543222", "0");
    // console.log("-----------")
    // medical_BC_Service.attendReportInsert("10001", "1570675543222", "1");
    // medical_BC_Service.attendReportInsert("10003", "1570675643222", "0");
    // medical_BC_Service.attendReportInsert("10003", "1570675843222", "1");
    // medical_BC_Service.attendReportInsert("10003", "1570686653333", "0");

    // Check User type Password 
   
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err);
            } else {

                db = db.db('belief');
                console.log('db connected...ok');
                // 1. Check password in member DB
          

                        // 2.Check member in same department
                    db.collection('member').find({"DEPT" : req.session.dept}).toArray(
                     (err, result) => { 
                             //result : All member in same department 

                            // Check User authority 
                            if(req.session.admin){   
                                
                                const FinalResultArr = [];
                                const MemberNumForRecord = []; // Number of what we want to find
                                const findResult = [];  // Final result (Result of Entrance Record)
                                let k = 0;
                                console.log("=====",result);

                                for(j=0; j<result.length; j++){ // 조회할 사람 숫자
                                    //console.log("====Member number to find",result[j].MEMBER_NO)
                                    MemberNumForRecord.push(String(result[j].MEMBER_NO));
                                    const FinalResultObj = {
                                        FinDept : '',
                                        FinNum : '',
                                        FinName : '',
                                        FinTotalTime : ''
                                    }
                                    console.log('----------')
                                    
                                    // 3. Find Entrance Record in Blockchain
                                    const stampArr = new Array();  // 타임 스탬프 담기
                                    const totalArr = new Array();  

                                    medical_BC_Service.getHistoryForNo(MemberNumForRecord[j]).then((blockResult) => {
                                        if(JSON.parse(blockResult)[0]){
                                        console.log("Entrance Result :", JSON.parse(blockResult));
                                            
                                        let l = 0;
                                        for(m=0;m<JSON.parse(blockResult).length;m++){
                                         
                                            // 예외처리 : 출근했을 때 조회하는 기능
                                                console.log("status",(JSON.parse(blockResult)[0].Value.status))          
                                                if((JSON.parse(blockResult)[0].Value.status) == "1"){
                                                    m++;
                                                }

                                                if((JSON.parse(blockResult)[JSON.parse(blockResult).length-1].Value.status) == "0"){
                                                    if(m == JSON.parse(blockResult).length-1){
                                                        m++;
                                                    }else{
                                                        stampArr.push((JSON.parse(blockResult)[l].Value.timestamp));
                                                        l++;
                                                    }
                                                }else{
                                                    stampArr.push((JSON.parse(blockResult)[l].Value.timestamp));
                                                    l++;
                                                }
                                                
                                                
                                        
                                        }
                                    }
                                    })

                                    console.log(stampArr); // 조회한 직원 모든 기록 갯수
                                    console.log('이력 조회 성공');

                            
                                        const calTime = (stampArr) => {
                                            let totalTime = 0;
                                            for(i=stampArr.length/2; i>0; i--){
                                                totalTime += stampArr[2*i-1]-stampArr[2*i-2];
                                            }
                                            return totalTime = (totalTime/(1000*60));
                                            
                                        }
                                        calTime(stampArr);
                                        console.log(calTime(stampArr));

                                        FinalResultObj.FinDept = result[j].DEPT;
                                        FinalResultObj.FinName = result[j].MEMBER_NAME;
                                        FinalResultObj.FinNum =  result[j].MEMBER_NO;
                                        FinalResultObj.FinTotalTime = calTime(stampArr);

                                        FinalResultArr.push(FinalResultObj);


                                    k++;
                                    if(k == result.length){
                                        
                                        console.log("FINAL!!",FinalResultArr)
                                        res.send(JSON.stringify(FinalResultArr));
                                    }
                                 }
                                
                        } else {
                            console.log("DENY");
                        }

                        })

            
            }//end else        
        });

});

module.exports = router;