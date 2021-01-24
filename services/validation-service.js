const ErrorService = require('./error-service');

const validateModel = async (model, payload) => {
    const requiredFields = [];

    for (let field in model) {
        if (model[field].required && payload[field] === undefined) {
            requiredFields.push(field);
        }
    }

    if (requiredFields.length > 0) {
        throw ErrorService.InvalidRequestError(undefined, requiredFields);
    }
};

module.exports = {
    validateModel,
};
