const { cleanEnv, num } = require('envalid');
const logger = require('./logger');

const env = cleanEnv(process.env, {
  PORT: num({ default: 8080 }),
});

logger.info('Required environment variables are present');

module.exports = env;
