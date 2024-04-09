const redux = require('redux');
const { createStore, bindActionCreators, combineReducers, applyMiddleware } = redux;

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

// Cake Actions

function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

// Ice Cream Actions
function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

// (previousState, action) => newState

// What does our state look like?
const initialState = {
  numCakes: 10,
  numIceCreams: 10,
};

const initialCakeState = {
  numCakes: 10,
};
const initialIceCreamState = {
  numIceCreams: 20,
};

// We should have two reducers.
// Each reducer represents a shopkeeper.
// Shopkeeper One tracks number of cakes.
// Shopkeeper Two tracks number of ice creams.
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numCakes: state.numCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numCakes: state.numCakes + action.payload,
      };

    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numIceCreams: state.numIceCreams - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numIceCreams: state.numIceCreams + action.payload,
      };
    case CAKE_ORDERED:
      return {
        ...state,
        numIceCreams: (state.numIceCreams -= 1),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));
console.log('Initial state: ', store.getState(), '\n');

const unsubscribe = store.subscribe(() => {});

// Dispatch an Action using store
// store.dispatch(orderCake());

/**
 * bindActionCreators is no longer used.
 * It was used back in the day, when
 * Actions were passed as props to components.
 */
const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);

actions.orderCake();

unsubscribe();
