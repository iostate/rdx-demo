const createSlice = require('@reduxjs/toolkit').createSlice;
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk;
const axios = require('axios');

const initialState = {
  loading: false,
  posts: [],
  error: '',
};

const fetchPosts = createAsyncThunk('post/fetchPosts', () => {
  return (
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      // .then((response) => response.data.map((post) => post.id));
      .then((response) => {
        return response.data.map((post) => post.body);
      })
  );
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.posts = [];
    });
  },
});

module.exports = postSlice.reducer;
module.exports.fetchPosts = fetchPosts;
