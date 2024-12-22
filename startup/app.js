var Apps = [];

const BASE_DIR = "../";

Apps.push({
  name: "RCCG Website",
  script: BASE_DIR + "server/app.js",
  exec_mode: "fork",
  log_date_format: "YYYY-MM-DD HH:mm:ss",
  env: {
    TZ: "Africa/Lagos"
  }
});

module.exports = Apps.slice().map((app) => {
  app["source_map_support"] = true;
  return app;
});
