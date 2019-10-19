'use strict';

const shim = require('fabric-shim');
const util = require('util');

let Chaincode = class {
    async Init(stub) {
        console.info('=========== Instantiated Medical Report chaincode ===========');

        return shim.success();
    }

    async Invoke(stub) {
        let ret = stub.getFunctionAndParameters();

        console.info(ret);

        let method = this[ret.fcn];

        if (!method) {
            console.error('no function of name:' + ret.fcn + ' found');

            throw new Error('Received unknown function ' + ret.fcn + ' invocation');
        }

        try {
            let payload = await method(stub, ret.params);

            return shim.success(payload);
        } catch (err) {
            console.log(err);

            return shim.error(err);
        }
    }

    async queryReport(stub, args) {
        if (args.length != 1) {
            throw new Error('Incorrect number of arguments. Expecting timestamp ex: p001');
        }

        let key = args[0];
        let dataAsBytes = await stub.getState(key); //get the mr from chaincode state

        if (!dataAsBytes || dataAsBytes.toString().length <= 0) {
            throw new Error(dataAsBytes + ' does not exist: ');
        }

        console.log(dataAsBytes.toString());

        return dataAsBytes;
    }

    async createAttend(stub, args) {
        console.info('============= START : createAttend ===========');
        console.log('args[0]: ', args[0], '\n');

        if (args.length != 3) {
            throw new Error('Incorrect number of arguments. Expecting 3');
        }

        let key = args[0];
        let mr = {
            timestamp: args[1],
            status: args[2]
        }

        if (await stub.getState(key) != '') {
            console.log('왜 안되는ㄷ ㅔ-_-');

            let dataAsBytes = await stub.getState(key);

            console.log('dataAsBytes: ', dataAsBytes);

            if (!dataAsBytes || dataAsBytes.toString().length <= 0) {
                throw new Error(dataAsBytes + ' does not exist: ');
            }

            console.log('dataAsBytes: ', dataAsBytes.toString());

            let parsedDataAsBytes = JSON.parse(dataAsBytes.toString());

            if (parsedDataAsBytes.status == '0') {
                console.log(parsedDataAsBytes.status);

                mr.timestamp = args[1];
                mr.status = '1';
            } else {
                console.log(parsedDataAsBytes.status);

                mr.timestamp = args[1];
                mr.status = '0';
            }
        }

        await stub.putState(key, Buffer.from(JSON.stringify(mr)));

        console.info('============= END : createAttend ===========');
    }

    async getHistoryForNo(stub, args) {
        if (args.length < 1) {
            throw new Error('Incorrect number of arguments. Expecting 1, ex) p001')
        }

        let key = args[0];

        console.info('- start getHistoryForNo: %s\n', key);

        let iterator = await stub.getHistoryForKey(key);
        let allResults = [];
        let isHistory = true;

        while (isHistory) {
            let res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                let jsonRes = {};

                console.log(res.value.value.toString('utf8'));

                if (isHistory && isHistory === true) {
                    jsonRes.TxId = res.value.tx_id;
                    jsonRes.Timestamp = res.value.timestamp;
                    jsonRes.IsDelete = res.value.is_delete.toString();

                    try {
                        jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
                    } catch (err) {
                        console.log(err);
                        jsonRes.Value = res.value.value.toString('utf8');
                    }
                } else {
                    jsonRes.Key = res.value.key;

                    try {
                        jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                    } catch (err) {
                        console.log(err);
                        jsonRes.Record = res.value.value.toString('utf8');
                    }
                }

                allResults.push(jsonRes);
            }
            if (res.done) {
                console.log('end of data');

                await iterator.close();

                console.info(allResults);

                isHistory = false;
            }
        }//end while 

        return Buffer.from(JSON.stringify(allResults));
    }

    async getHistoryCond(stub, args) {
        if (args.length < 1) {
            throw new Error('Incorrect number of arguments. Expecting 1, ex) p001')
        }

        let key = args[0];
        let startTime = args[1];
        let endTime = args[2];

        console.log('체인코드에서 ', startTime);
        console.log('체인코드에서 ', endTime);

        console.info('- start getHistoryForNo: %s\n', key);

        let iterator = await stub.getHistoryForKey(key);
        let allResults = [];
        let isHistory = true;

        while (isHistory) {
            let res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                let jsonRes = {};

                console.log(res.value.value.toString('utf8'));

                if (isHistory && isHistory === true) {
                    jsonRes.TxId = res.value.tx_id;
                    jsonRes.Timestamp = res.value.timestamp;
                    jsonRes.IsDelete = res.value.is_delete.toString();

                    try {
                        jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
                    } catch (err) {
                        console.log(err);
                        jsonRes.Value = res.value.value.toString('utf8');
                    }
                } else {
                    jsonRes.Key = res.value.key;

                    try {
                        jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                    } catch (err) {
                        console.log(err);
                        jsonRes.Record = res.value.value.toString('utf8');
                    }
                }

                allResults.push(jsonRes);
            }
            if (res.done) {
                console.log('end of data');

                await iterator.close();

                console.info(allResults);

                isHistory = false;
            }
        }//end while 

        return Buffer.from(JSON.stringify(allResults));
    }
}

shim.start(new Chaincode());