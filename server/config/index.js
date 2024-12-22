const Config = Object.freeze({
  App: {
    PORT: process.env.PORT,
  }
});

console.log(Config.App);
module.exports = Config;
