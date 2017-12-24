module.exports = Object.freeze({
  supressAnalytics: !!process.env.FV_SUPRESS_ANALYTICS,
  supressSentry: !!process.env.FV_SUPRESS_SENTRY,
  supressCaching: !!process.env.FV_SUPRESS_CACHING,
  mailgun: process.env.FV_MAILGUN,
  jwtSecret: process.env.FV_JWT_SECRET,
  sentry: process.env.FV_SENTRY,
  rdsDbName: process.env.FV_RDS_DB_NAME,
  rdsHostname: process.env.FV_RDS_HOSTNAME,
  rdsPassword: process.env.FV_RDS_PASSWORD,
  rdsPort: process.env.FV_RDS_PORT,
  rdsUsername: process.env.FV_RDS_USERNAME
});
