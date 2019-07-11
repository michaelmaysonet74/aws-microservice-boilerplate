const resources = require('./resources');
const ErrorService = require('./services/error-service');

exports.handler = async (event) => {
	try {
		const { resource, httpMethod } = event;

		if (typeof resources[resource] === 'undefined') {
			throw ErrorService.NotFoundError();
		}
		
		if (typeof resources[resource][httpMethod] === 'undefined') {
			throw ErrorService.MethodNotAllowedError();
		}
		
		return await resources[resource][httpMethod](event);
	}
	catch(e) {
		return e;
	}
};
