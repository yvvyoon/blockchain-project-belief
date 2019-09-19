'use strict';

const request = require('request');

const subscriptionKey = '...';
const uriBase = 'https://...cognitiveservices.azure.com/face/v1.0/verify';
const params = {
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
        'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise',
};
const options = {
    uri: uriBase,
    qs: params,
    // facedetection1.js, facedetection2.js에서 얻은 각 faceId를 body로 전송
    body: '{"faceId1": "a6ebe63f-7739-418f-b219-5180ffea8700", "faceId2": "c96cfd3b-b513-4f9f-a677-4fc11e6fd1f6"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey
    }
};

request.post(options, (error, response, body) => {
    if (error) {
        console.log('Error: ', error);

        return;
    }

    // let jsonResponse = JSON.stringify(JSON.parse(body), null, ' ');
    let jsonResponse = JSON.parse(body);

    console.log('JSON Response\n');

    // 일치율 추출
    // 0.123512 형태
    console.log(jsonResponse.confidence);
});