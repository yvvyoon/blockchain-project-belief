const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet, X509WalletMixin, Gateway } = require('fabric-network');

const ccpPath = path.resolve(__dirname, '..', 'basic_articles', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

// Create a new CA client for interacting with the CA.
const caURL = ccp.certificateAuthorities['ca.example.com'].url;
const ca = new FabricCAServices(caURL);

// Create a new file system based wallet for managing identities.
const walletPath = path.join(process.cwd(), 'wallet');
const wallet = new FileSystemWallet(walletPath);

console.log(`Wallet path: ${walletPath}`);

module.exports = {
    attendReportInsert: async function (member_no, timestamp, status) {
        try {            
            const userExists = await wallet.exists('user2');

            if (!userExists) {
                console.log('An identity for the user "user2" does not exist in the wallet');
                
                await res.json({
                    'msg': '연결부터 해주세요'
                });
                
                return;
            }

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();

            await gateway.connect(ccp, { 
                wallet, 
                identity: 'user2', 
                discovery: { 
                    enabled: false 
                } 
            });

            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('mychannel');

            // Get the contract from the network.
            const contract = network.getContract('medicalreport');

            await contract.submitTransaction('createAttend', member_no, timestamp, status);
            
            console.log('Blockchain 입력 완료');
        } catch (e) {
            console.log(e);
        }
    },

    getHistoryForNo: async function (member_no) {
        try {
            console.log('member_no:', member_no);
            
            const userExists = await wallet.exists('user2');

            if (!userExists) {
                console.log('An identity for the user "user2" does not exist in the wallet');
                
                await res.json({
                    'msg': '연결부터 해주세요'
                });
                
                return;
            }

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();

            await gateway.connect(ccp, { 
                wallet, 
                identity: 'user2', 
                discovery: { 
                    enabled: false 
                } 
            });
            console.log("testtest");
            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('mychannel');

            // Get the contract from the network.
            const contract = network.getContract('medicalreport');

            // let result = await contract.evaluateTransaction('getHistoryForNo', member_no);
            let result = await contract.evaluateTransaction('getHistoryForNo', member_no);
            
            console.log('Transaction 출력 완료');
            
            return result.toString();
        } catch (e) {
            console.log(e);
        }
    },

    getHistoryCond: async function (member_no, startTime, endTime) {
        try {
            console.log('member_no:', member_no);
            console.log('startTime:', startTime);
            console.log('endTime:', endTime);
            
            const userExists = await wallet.exists('user2');

            // user가 없을 때
            if (!userExists) {
                console.log('An identity for the user "user2" does not exist in the wallet');
                
                await res.json({
                    'msg': '연결부터 해주세요'
                });
                
                return;
            }

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();

            await gateway.connect(ccp, { 
                wallet, 
                identity: 'user2`', 
                discovery: { 
                    enabled: false 
                } 
            });

            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('mychannel');

            // Get the contract from the network.
            const contract = network.getContract('medicalreport');

            try {
                let result = await contract.evaluateTransaction('getHistoryCond', member_no, startTime, endTime);
                let result2 = JSON.parse(result.toString());
                let result3 = [];
                
                console.log('체인코드로 보내기 성공');

                result2.forEach(element => {
                    if ((element.Value.timestamp >= startTime) && (element.Value.timestamp <= endTime)) {
                        // console.log(element.Value.timestamp, ' -> ', element.Value.status);

                        result3.push(element.Value.timestamp);
                    }
                });

                return result3;
            } catch (e) {
                console.log('체인코드로 보내기 실패');
                console.error(e);
            }
        } catch (e) {
            console.log(e);
        }
    }
}