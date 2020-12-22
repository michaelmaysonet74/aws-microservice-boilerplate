module.exports = {
    InvalidRequestError: (message = 'Invalid or Missing parameters.', fields) => {
        return {
            statusCode: 400,
            body: JSON.stringify({
                code: 400,
                message,
                fields,
            }),
            headers: {
                'Access-Control-Allow-Origin': process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
            },
        };
    },
    UnauthorizedRequestError: (message = 'Unauthorized Request.') => {
        return {
            statusCode: 401,
            body: JSON.stringify({
                code: 401,
                message,
            }),
            headers: {
                'Access-Control-Allow-Origin': process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
            },
        };
    },
    NotFoundError: (message = 'Resource was not found.') => {
        return {
            statusCode: 404,
            body: JSON.stringify({
                code: 404,
                message,
            }),
            headers: {
                'Access-Control-Allow-Origin': process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
            },
        };
    },
    MethodNotAllowedError: (message = 'Method not allowed.') => {
        return {
            statusCode: 405,
            body: JSON.stringify({
                code: 405,
                message,
            }),
            headers: {
                'Access-Control-Allow-Origin': process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
            },
        };
    },
    InternalServerError: (message = 'Internal Server Error.') => {
        return {
            statusCode: 500,
            body: JSON.stringify({
                code: 500,
                message,
            }),
            headers: {
                'Access-Control-Allow-Origin': process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
            },
        };
    },
};
