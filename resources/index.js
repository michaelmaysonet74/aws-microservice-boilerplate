const resources = {
    ...require('./sample-resource.js/index.js'),
};

let transformedResources = {};

if (typeof process.env.API_BASE_URL !== 'undefined') {
    for (let key in resources) {
        transformedResources[
            `${process.env.API_BASE_URL}${key}`
        ] = resources[key];
    }
}
else {
    transformedResources = { ...resources };
}

module.exports = transformedResources;