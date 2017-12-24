const { urlFor } = require('../../util/urlFor');
const { supressAnalytics } = require('../../keys');

const renderPage = function(req, res) {
  res.render('error.html', { urlFor, supressAnalytics });
};

module.exports = {
  renderPage
};
