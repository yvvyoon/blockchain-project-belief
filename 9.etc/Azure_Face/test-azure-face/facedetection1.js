'use strict';

// request 모듈
const request = require('request');

// 나의 Azure Face API키
const subscriptionKey = '...';
// 나의 Endpoint URL
const uriBase = 'https://...cognitiveservices.azure.com/face/v1.0/detect';
// 사용할 이미지 경로
const imageUrl = 'https://www.arsenal.com/sites/default/files/styles/mobile_16x9/public/images/ozil_65.jpg?itok=fxe5L22X';
const params = {
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
        'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise',
};
const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
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
    console.log(jsonResponse[0].faceId);
});