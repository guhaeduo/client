const { createProxyMiddleware } = require('http-proxy-middleware');

const regions = [
  'kr',
  'jp1',
  'ph2',
  'sg2',
  'th2',
  'tw2',
  'vn2',
  'na1',
  'br1',
  'la1',
  'la2',
  'oc1',
  'euw1',
  'eun1',
  'ru',
  'tr1',
];

const proxyRewrites = regions.map((region) => ({
  context: `/${region}`,
  target: `https://${region}.api.riotgames.com`,
  pathRewrite: {
    [`^/${region}`]: '',
  },
}));

module.exports = (app) => {
  app.use(
    '/asia',
    createProxyMiddleware({
      target: 'https://asia.api.riotgames.com',
      changeOrigin: true,
      pathRewrite: {
        '^/asia': '/',
      },
    }),
  );
  proxyRewrites.forEach(({ context, target, pathRewrite }) => {
    app.use(
      context,
      createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite,
      }),
    );
  });
};
