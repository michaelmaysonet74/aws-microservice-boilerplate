const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const ErrorService = require('./error-service');

const initParams	= {
	TableName: process.env.SAMPLE_TABLE_NAME,
};

function getSampleById(id) {
	const params = {
		...initParams,
		Key: {
			id,
		},
	};

	return new Promise((resolve, reject) => {
		db.get(params, (err, data) => {
			if (err || typeof data.Item === 'undefined') {
				return reject(ErrorService.NotFoundError());
			}

			return resolve(data.Item);
		});
	});
}

function createSample(name) {
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
}

module.exports = {
	getSampleById,
	createSample,
};
