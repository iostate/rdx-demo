const { createStore } = require('redux');
const { produce } = require('immer');

const initialState = {
  name: 'Quan',
  address: {
    street: '123 Main Street',
    city: 'Phoenix',
    state: 'AZ',
  },
};

const STREET_UPDATED = 'STREET_UPDATED';
const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    // return {
    //   ...state,
    //   address: {
    //     ...state.address,
    //     street: action.payload,
    //   },
    // };
    default: {
      return state;
    }
  }
};

const store = createStore(reducer);

console.log('Initial state: ', store.getState());

const unsubscribe = store.subscribe(() => {
  console.log('Updated state: ', store.getState());
});

store.dispatch(updateStreet('1612 E. Ocotillo Rd.'));

unsubscribe();
