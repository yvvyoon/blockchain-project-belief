'use strict';

const request = require('request');

const subscriptionKey = '...';
const uriBase = 'https://...cognitiveservices.azure.com/face/v1.0/detect';
const imageUrl = 'https://i2.wp.com/metro.co.uk/wp-content/uploads/2019/05/GettyImages-1148152280.jpg?quality=90&strip=all&zoom=1&resize=644%2C441&ssl=1';
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