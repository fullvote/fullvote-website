const path = require('path');
const fs = require('fs');
const request = require('supertest');
const mkdirp = require('mkdirp');

const app = require('../app');
const routes = require('../routes/configuration');

const destDir = routes.preRender.destDir;
const pages = routes.preRender.pages;

const preRenderRoutes = () =>
  pages.forEach(route =>
    request(app)
      .get(route.url)
      .then(response => {
        const filepath = path.join(__dirname, '../', destDir, route.file);
        fs.writeFile(filepath, response.text, err => {
          if (err) {
            return console.log(err);
          }
          console.log(`Wrote ${route.file}`);
        });
      })
  );
mkdirp(path.join(__dirname, `../${routes.preRender.destDir}`), preRenderRoutes);
