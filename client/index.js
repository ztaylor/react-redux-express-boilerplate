require('hpropagate')();

const server = require('./server');
const { PORT } = require('./env-vars');
const logger = require('./logger');

server.listen(PORT, () => {
  logger.info('Server running on port %d', PORT);
});
