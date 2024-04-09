const { createStore, bindActionCreators, applyMiddleware } = require('redux');
const { thunk } = require('redux-thunk');
const axios = require('axios');
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

const initialState = {
  loading: true,
  data: [],
  error: '',
};

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
    // payload: [{name: 'Quan', age: 32}]
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
};

const fetchUsersFailed = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        data: action.payload,
        error: '',
      };
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest);
    console.log(dispatch);
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        const users = res.data.map((user) => user.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((err) => {
        console.error(err.message);
        dispatch(fetchUsersFailed(err.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

const actions = bindActionCreators(
  { fetchUsers, fetchUsersRequest, fetchUsersSuccess, fetchUsersFailed },
  store.dispatch
);

actions.fetchUsers();
// OR
store.dispatch(fetchUsers());
