const resources = {
  ...require("./sample-resource.js/index.js"),
};

module.exports =
  process.env.API_BASE_URL !== undefined
    ? Object.keys(resources).reduce(
        (acc, key) => ({
          ...acc,
          [`${process.env.API_BASE_URL}${key}`]: resources[key],
        }),
        {}
      )
    : resources;
