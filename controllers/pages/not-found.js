const { urlFor } = require('../../util/urlFor');
const { supressAnalytics } = require('../../keys');

const renderPage = function(req, res) {
  res.render('notFound.html', { urlFor, supressAnalytics });
};

module.exports = {
  renderPage
};
