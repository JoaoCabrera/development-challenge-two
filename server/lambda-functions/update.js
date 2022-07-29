const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const normalizeEvent = require('./normalizer');
const response = require('./response');

exports.handler = async (event) => {
    const { data } = normalizeEvent(event);
    const params = {
        TableName: 'patients',
        Key: {
            idpatients: parseInt(data.idpatients, 10),
        },
        UpdateExpression: 'set #a = :x, #b = :e, #c = :y, #d = :z',
        ExpressionAttributeNames: {
            '#a': 'name',
            '#b': 'email',
            '#c': 'birth_date',
            '#d': 'address',
            
        },
        ExpressionAttributeValues: {
            ':x': data.name,
            ':e': data.email,
            ':y': data.birth_date,
            ':z': data.address,
            
        },
    };
    
    try {
        await dynamo.update(params).promise();
        return response(200, { message: 'Patient updated successfully' });
    } catch (err) {
        console.log(err);
        return response(500, { message: 'Unexpected error' });
    }
};