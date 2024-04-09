const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
  numOfCakes: 10,
};

const cakeSlice = createSlice({
  name: 'cake',
  initialState: initialState,
  reducers: {
    // don't need action since we are just decrementing
    // cake by 1
    ordered: (state, action) => {
      state.numOfCakes--;
    },
    restocked: (state, action) => {
      state.numOfCakes += action.payload;
    },
  },
});

module.exports = cakeSlice.reducer;
module.exports.cakeActions = cakeSlice.actions;
