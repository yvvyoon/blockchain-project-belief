const MongoClient=require('mongodb').MongoClient;
const url='mongodb://70.12.229.178:27017/SmartHC';

module.exports={
    medicalReportInsert: function(pcode, name,ssn){
        MongoClient.connect(url, function(err,db){
            if(err){
                console.log(err);
            }else{                
                db = db.db('SmartHC'); /*database명을 다시 한번 명시했다. 이거 안 하면 에러남*/
                console.log('db connected...ok');
                db.collection('medicalForm').insertOne(
                    {
                        "pcode":pcode,
                        "name":name,
                        "ssn":ssn,
                        // "addr":addr,
                        // "email":email,
                        // "visitDate":visitDate,
                        // "desease":desease,
                        // "deseaseCode":deseaseCode,
                        // "content":content
                    },
                    (err, result)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log('진료확인서 DB 저장됨\n');
                            //console.log(result);
                        }
                    }
                );
            }
        });
    }
}
