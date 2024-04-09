const createSlice = require('@reduxjs/toolkit').createSlice;
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk;
const axios = require('axios');

const initialState = {
  loading: false,
  users: [],
  error: '',
};

// createAsyncThunk automatically generates pending, fulfilled, or rejected states based on the result of the Promise
const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
  return axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.data.map((user) => user.id));
});

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = '';
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;

      // is this correct? will action have error property?
      // shouldn't this be action.payload?
      state.error = action.error.message;
      console.log(action);
      // state.error = action.payload;
      state.users = [];
    });
  },
});

module.exports = userSlice.reducer;
module.exports.fetchUsers = fetchUsers;
