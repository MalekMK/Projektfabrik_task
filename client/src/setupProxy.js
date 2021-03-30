const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // You can pass in an array too eg. ['/api', '/another/path']
    createProxyMiddleware({
      target: process.env.PROXY,
      secure: false,
      logLevel: "debug",
      changeOrigin: true,
    })
  );
};