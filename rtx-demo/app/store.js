const configureStore = require('@reduxjs/toolkit').configureStore;

const { Tuple } = require('@reduxjs/toolkit');
const cakeReducer = require('../features/cake/cakeSlice');
const iceCreamReducer = require('../features/icecream/icecreamSlice');

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

const { thunk } = require('redux-thunk');

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: iceCreamReducer,
  },
  // middleware: () => new Tuple(thunk, logger),
  middleware: (gdM) => gdM().concat(thunk).concat(logger),
});
module.exports = store;
