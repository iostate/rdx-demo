const store = require('./app/store');

const { cakeActions } = require('./features/cake/cakeSlice');
const { iceCreamActions } = require('./features/icecream/icecreamSlice');
const fetchUsers = require('./features/user/userSlice').fetchUsers;
const fetchPosts = require('./features/post/postSlice').fetchPosts;

// console.log(store.getState());

const unsubscribe = store.subscribe(() => {
  console.log('Updated state: ', store.getState());
});

store.dispatch(cakeActions.ordered());
store.dispatch(fetchUsers());
store.dispatch(fetchPosts());
// store.dispatch(cakeActions.restocked(5));
unsubscribe();
