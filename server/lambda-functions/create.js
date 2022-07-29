const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const normalizeEvent = require('./normalizer');
const response = require('./response');

exports.handler = async (event) => {
    const { data } = normalizeEvent(event);
    const params = {
        TableName: 'patients',
        Item: data,
    };
    
    try {
        await dynamo.put(params).promise();
        return response(201, { message: 'Patient created successfully' });
    } catch (err) {
        console.log(err);
        return response(500, { message: 'Unexpected error' });
    }
};