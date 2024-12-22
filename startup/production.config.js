const Apps = require("./app");
const ENV_NAME = "production";

Apps.map((app) => {
  app.name = app.name + "-" + ENV_NAME;
  app.env = {
    NODE_ENV: ENV_NAME,
    PORT: 6400
  };
  return app;
});

var Startup = { apps: Apps };

module.exports = Startup;
