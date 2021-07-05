const bunyan = require('bunyan');

const logger = bunyan.createLogger({ name: 'code-test' });

module.exports = logger;
