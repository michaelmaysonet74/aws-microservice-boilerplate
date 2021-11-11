const ErrorService = require("./error-service");

const validateSchema = async (schema, payload) => {
  const requiredFields = [];

  for (let field in schema) {
    if (schema[field].required && payload[field] === undefined) {
      requiredFields.push(field);
    }
  }

  if (requiredFields.length > 0) {
    throw ErrorService.InvalidRequestError(undefined, requiredFields);
  }
};

module.exports = {
  validateSchema,
};
