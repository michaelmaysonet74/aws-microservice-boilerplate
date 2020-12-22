const SampleService = require('../services/sample-service');
const ErrorService = require('../services/error-service');
const ValidationService = require('../services/validation-service');

async function GET(event) {
    if (!event || !event.pathParameters || !event.pathParameters.id) {
        return Promise.reject(ErrorService.InvalidRequestError());
    }

    try {
        const {
            id,
            name
        } = await SampleService.getSampleById(event.pathParameters.id);

        return Promise.resolve({
            statusCode: 200,
            body: JSON.stringify({
                id: id.toString(),
                name,
            }),
            headers: {
                'Access-Control-Allow-Origin': process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
            },
        });
    }
    catch (e) {
        return Promise.reject(e);
    }
}

async function POST(event) {
    if (!event || !event.body) {
        return Promise.reject(ErrorService.InvalidRequestError());
    }

    try {
        const body = JSON.parse(event.body);

        await ValidationService.validateModel(
            require('../models/sample-model'),
            body
        );

        const {
            id,
            name
        } = await SampleService.createSample(body);

        return Promise.resolve({
            statusCode: 200,
            body: JSON.stringify({
                id: id.toString(),
                name,
            }),
            headers: {
                'Access-Control-Allow-Origin': process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
            },
        });
    }
    catch (e) {
        return Promise.reject(e);
    }
}

module.exports = {
    '/sample/{id}': {
        GET,
    },
    '/sample': {
        POST,
    }
};
