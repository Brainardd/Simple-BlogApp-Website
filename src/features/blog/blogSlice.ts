import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../api/supabaseClient';
import type { RootState } from '../../store';

export interface Blog {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
}

interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  totalCount: number; // new
}

const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
  totalCount: 0,
};


// Fetch blogs with pagination
export const fetchBlogs = createAsyncThunk(
  'blog/fetchBlogs',
  async ({ page = 1, limit = 5 }: { page: number; limit: number }) => {
    const { count: totalCount, error: countError } = await supabase
      .from('blogs')
      .select('id', { count: 'exact', head: true });

    if (countError) throw countError;

    const from = (page - 1) * limit;
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .range(from, from + limit - 1)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { blogs: data as Blog[], totalCount: totalCount || 0 };
  }
);


// Create a blog
export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async ({ title, content }: { title: string; content: string }) => {
    const { data, error } = await supabase
      .from('blogs')
      .insert({ title, content })
      .select();

    if (error) throw error;
    return data[0] as Blog;
  }
);

// Update a blog
export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async ({ id, title, content }: { id: string; title: string; content: string }) => {
    const { data, error } = await supabase
      .from('blogs')
      .update({ title, content })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0] as Blog;
  }
);

// Delete a blog
export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (id: string) => {
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) throw error;
    return id;
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchBlogs.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchBlogs.fulfilled, (state, action) => { state.loading = false; state.blogs = action.payload.blogs; state.totalCount = action.payload.totalCount; })
      .addCase(fetchBlogs.rejected, (state, action) => { state.loading = false; state.error = action.error.message || null })

      // Create
      .addCase(createBlog.fulfilled, (state, action) => { state.blogs.unshift(action.payload) })

      // Update
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(b => b.id === action.payload.id);
        if (index !== -1) state.blogs[index] = action.payload;
      })

      // Delete
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(b => b.id !== action.payload);
      });
  },
});

export const selectBlogs = (state: RootState) => state.blog.blogs;

export default blogSlice.reducer;
