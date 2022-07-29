const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const normalizeEvent = require('./normalizer');
const response = require('./response');

exports.handler = async (event) => {
    const { pathParameters } = normalizeEvent(event);
    const params = {
        TableName: 'patients',
    };
    
    try {
        let result = {};
        if(pathParameters && pathParameters['idpatients']) {
            result = await dynamo.get({
                ...params,
                Key: {
                    idpatients: parseInt(pathParameters['idpatients'], 10),
                },
            }).promise();
        } else {
            result = await dynamo.scan(params).promise();
        }
        return response(200, result);
    } catch (err) {
        console.log(err);
        return response(500, { message: 'Unexpected error' });
    }
};