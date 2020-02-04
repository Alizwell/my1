const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/webapi",
    proxy({
      target: "http://39.98.108.23/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": ""
      }
    })
  );
};
