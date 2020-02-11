const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/webapi",
    proxy({
      target: "http://39.98.108.23/",
      changeOrigin: true,
      router: {
        "http://192.168.1.5:3000": "http://39.98.108.23/"
      },
      pathRewrite: {
        "^/api": ""
      }
    })
  );
};
