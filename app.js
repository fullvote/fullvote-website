const express = require('express');
const helmet = require('helmet');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const mustacheExpress = require('mustache-express');
const winston = require('winston');
const routes = require('./routes/index');
const { getUrlFor, urlFor } = require('./util/urlFor');
const keys = require('./keys');
const {
  ravenClient,
  ravenRequestHandler,
  ravenErrorHandler
} = require('./lib/raven');

const app = express();

if (!keys.supressSentry) {
  ravenClient.patchGlobal();
  app.use(ravenRequestHandler);
}

// Configure templating engine
app.engine('html', mustacheExpress());
app.set('view engine', 'partial.html');
app.set('views', path.join(__dirname, 'views'));

// Configure gzip compression
app.use(compression());

// Configure security guards
app.disable('x-powered-by');
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.frameguard('deny'));
app.use(helmet.xssFilter());

// Configure favicon
app.use(favicon(path.join(__dirname, getUrlFor('/assets/images/favicon.ico'))));

// Configure logging
app.use(morgan('combined'));

// Configure parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Configure static files
if (keys.supressCaching) {
  app.use('/assets', express.static(path.join(__dirname, 'assets')));
  app.use('/public', express.static(path.join(__dirname, 'public')));
  app.use('/sw.js', express.static(path.join(__dirname, 'public/built/sw.js'))); // Built after assets rev-ed & copied over to public
  app.use(
    '/manifest.json',
    express.static(path.join(__dirname, 'assets/manifest.json'))
  );
  app.use(
    '/sitemap.xml',
    express.static(path.join(__dirname, 'assets/sitemap.xml'))
  );
} else {
  app.use('/public', express.static(path.join(__dirname, 'public')));
  app.use('/sw.js', express.static(path.join(__dirname, 'public/built/sw.js'))); // Built after assets rev-ed & copied over to public
  app.use(
    getUrlFor('/manifest.json'),
    express.static(
      path.join(__dirname, 'public', getUrlFor('/manifest.json').substring(1))
    )
  );
  app.use(
    '/sitemap.xml',
    express.static(path.join(__dirname, 'public/sitemap.xml'))
  );
}

// Configure routes
routes.configureForApp(app);

// Quasi-handle uncaught rejected promise
// Should never get here; if so sentry logs this
process.on('unhandledRejection', function(reason) {
  throw reason;
});

app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('notFound.html', { urlFor });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Resource not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Resource not found');
});

// Handle uncaught (or explicitly passed) errors
// Blah is not a function, cannot call x on undefined, etc
if (!keys.supressSentry) {
  app.use(ravenErrorHandler);
}
app.use((err, req, res, next) => {
  winston.error(err);
  const errorData = {
    status: 'An unexpected error has occured.'
  };
  try {
    // make sure we close down within 30 seconds
    // var killtimer = setTimeout(() => {
    //   process.exit(1);
    // }, 30000);
    // // But don't keep the process open just for that!
    // killtimer.unref();

    if (res.headersSent) {
      return next(err);
    }

    res.status(500);
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      res.send({ error: errorData });
    } else {
      res.render('error.html', { urlFor });
    }
  } catch (er2) {
    // make sure we close down within 3 seconds
    var killtimer = setTimeout(() => {
      process.exit(1);
    }, 3000);
    // But don't keep the process open just for that!
    killtimer.unref();
    winston.error('Error sending 500!', er2.stack);
  }
});

module.exports = app;
