const SampleService = require("../services/sample-service");
const ErrorService = require("../services/error-service");
const ValidationService = require("../services/validation-service");

const GET = async (event) => {
  if (!event?.pathParameters?.id) {
    throw ErrorService.InvalidRequestError();
  }

  const { id, name } = await SampleService.getSampleById(
    event.pathParameters.id
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: id.toString(),
      name,
    }),
    headers: {
      "Access-Control-Allow-Origin": process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
    },
  };
};

const POST = async (event) => {
  if (!event?.body) {
    throw ErrorService.InvalidRequestError();
  }

  const body = JSON.parse(event.body);

  await ValidationService.validateSchema(
    require("../schemas/sample-schema"),
    body
  );

  const { id, name } = await SampleService.createSample(body);

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: id.toString(),
      name,
    }),
    headers: {
      "Access-Control-Allow-Origin": process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
    },
  };
};

module.exports = {
  "/sample/{id}": {
    GET,
  },
  "/sample": {
    POST,
  },
};
