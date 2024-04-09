const store = require('./app/store');

const { cakeActions } = require('./features/cake/cakeSlice');
const { iceCreamActions } = require('./features/icecream/icecreamSlice');

console.log(store.getState());

const unsubscribe = store.subscribe(() => {});

store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.restocked(5));
store.dispatch(iceCreamActions.ordered());
store.dispatch(iceCreamActions.restocked(4));
