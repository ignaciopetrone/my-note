// Dinamically import during build-time
process.env.NODE_ENV === 'production'
  ? (module.exports = require('./configureStore.prod'))
  : (module.exports = require('./configureStore.dev'));
