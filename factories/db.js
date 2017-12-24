const pgPromise = require('pg-promise');
const keys = require('../keys');
const { rdsDbName, rdsHostname, rdsPassword, rdsPort, rdsUsername } = keys;

const pgp = pgPromise({});
const connectionObject = {
  host: rdsHostname,
  port: rdsPort,
  database: rdsDbName,
  user: rdsUsername,
  password: rdsPassword
};
const db = pgp(connectionObject);

module.exports = db;
