const path = require("path");

module.exports = {
  webpack: (config) => {
    config.resolve.alias["styles"] = path.join(__dirname, "styles");
    config.resolve.alias["components"] = path.join(__dirname, "components");
    config.resolve.alias["utils"] = path.join(__dirname, "utils");
    config.resolve.alias["service"] = path.join(__dirname, "service");
    config.resolve.alias["request"] = path.join(__dirname, "request");
    return config;
  },
};
