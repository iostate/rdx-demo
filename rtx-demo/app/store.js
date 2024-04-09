const configureStore = require('@reduxjs/toolkit').configureStore;

const { Tuple } = require('@reduxjs/toolkit');
const cakeReducer = require('../features/cake/cakeSlice');

const iceCreamReducer = require('../features/icecream/icecreamSlice');

const userReducer = require('../features/user/userSlice');

const postReducer = require('../features/post/postSlice');

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

const { thunk } = require('redux-thunk');

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: iceCreamReducer,
    user: userReducer,
    post: postReducer,
  },
  // middleware: () => new Tuple(thunk, logger),
  middleware: (gdM) => gdM().concat(thunk).concat(logger),
});

module.exports = store;
