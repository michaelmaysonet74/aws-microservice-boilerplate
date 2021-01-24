const AWS = require('aws-sdk');
const ErrorService = require('./error-service');

const db = new AWS.DynamoDB.DocumentClient();
const initParams = {
    TableName: process.env.SAMPLE_TABLE_NAME,
};

const getSampleById = (id) => {
    const params = {
        ...initParams,
        Key: {
            id,
        },
    };

    return new Promise((resolve, reject) => {
        db.get(params, (err, data) => {
            if (err || data.Item === undefined) {
                return reject(ErrorService.NotFoundError());
            }

            return resolve(data.Item);
        });
    });
};

const createSample = (name) => {
    const params = {
        ...initParams,
        Item: {
            name,
        },
    };

    return new Promise((resolve, reject) => {
        return db.put(params, (err, data) => {
            if (err) {
                return reject(ErrorService.InternalServerError());
            }

            return resolve(data.Attributes);
        });
    });
};

module.exports = {
    getSampleById,
    createSample,
};
