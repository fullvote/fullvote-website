const path = require('path');
const fs = require('fs');
const mustache = require('mustache');
const routes = require('../routes/configuration');

const baseFileName = 'elastic_beanstalk_proxy';

const templatePath = path.join(__dirname, `${baseFileName}.mustache`);
const data = {
  preRenderRoutes: routes.preRender.pages.map(
    route =>
      route.url === '/'
        ? Object.assign({}, route, { url: '/index.html' })
        : route
  ),
  destDir: routes.preRender.destDir,
  mimeType: routes.preRender.mimeType
};

fs.readFile(templatePath, 'utf8', (err, template) => {
  if (err) {
    return console.log(err);
  }
  const result = mustache.render(template, data);
  const filename = path.join(__dirname, `${baseFileName}.conf`);
  fs.writeFile(filename, result, err2 => {
    if (err2) {
      return console.log(err2);
    }
    console.log(`Wrote ${filename}`);
  });
});
