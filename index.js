const resources = require('./resources');
const ErrorService = require('./services/error-service');

exports.handler = async ({ resource, httpMethod }) => {
    if (resources[resource] === undefined) {
        throw ErrorService.NotFoundError();
    }

    if (resources[resource][httpMethod] === undefined) {
        throw ErrorService.MethodNotAllowedError();
    }

    return resources[resource][httpMethod](event);
};
