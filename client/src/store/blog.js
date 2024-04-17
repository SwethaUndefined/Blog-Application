import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blogs: [],
};

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addBlogReducer: (state, action) => {
      state.blogs.push(action.payload);
    },
    updateBlogReducer: (state, action) => {
      const { id, title, content } = action.payload;
      const blogToUpdate = state.blogs.find(blog => blog._id === id);
      if (blogToUpdate) {
        blogToUpdate.title = title;
        blogToUpdate.content = content;
      }
    },
    deleteBlogReducer: (state, action) => {
      state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
    },
    setBlogsReducer: (state, action) => {
      state.blogs = action.payload;
    },
  },
});

export const { addBlogReducer, updateBlogReducer, deleteBlogReducer, setBlogsReducer } = blogSlice.actions;

export default blogSlice.reducer;
