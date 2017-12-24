module.exports = Object.freeze({
  supressAnalytics: !!process.env.FV_SUPRESS_ANALYTICS,
  supressSentry: !!process.env.FV_SUPRESS_SENTRY,
  supressCaching: !!process.env.FV_SUPRESS_CACHING
});
