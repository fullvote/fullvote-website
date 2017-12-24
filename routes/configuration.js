const { getUrlFor } = require('../util/urlFor');

const internal = {
  page: {
    home: '/',
    error: '/error',
    notFound: '/not-found',
    sw: '/sw.js',
    manifest: getUrlFor('/manifest.json'),
    sitemap: '/sitemap.xml'
  },
  rest: {}
};

const external = {
  mailgun: 'https://api.mailgun.net/v3/'
};

const preRender = {
  destDir: 'public/views',
  mimeType: 'text/html',
  pages: [
    {
      file: 'home.html',
      url: internal.page.home
    },
    {
      file: 'error.html',
      url: internal.page.error
    },
    {
      file: 'notFound.html',
      url: internal.page.notFound
    },
    {
      file: 'sw.js',
      url: internal.page.sw,
      destDir: 'public/built',
      mimeType: 'application/javascript'
    },
    {
      file: getUrlFor('/manifest.json').substring(1),
      url: internal.page.manifest,
      destDir: 'public',
      mimeType: 'application/manifest+json'
    },
    {
      file: 'sitemap.xml',
      url: internal.page.sitemap,
      destDir: 'public',
      mimeType: 'text/xml'
    }
  ]
};

module.exports = {
  routes: Object.freeze(internal),
  external: Object.freeze(external),
  preRender: Object.freeze(preRender)
};
