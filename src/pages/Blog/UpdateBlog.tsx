import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchBlogs, updateBlog } from '../../features/blog/blogSlice';

const UpdateBlog = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const blog = useAppSelector((state) =>
    state.blog.blogs.find((b) => b.id === id)
  );

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
    } else if (id) {
      dispatch(fetchBlogs({ page: 1, limit: 100 }));
    }
  }, [blog, id, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await dispatch(updateBlog({ id, title, content })).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Failed to update blog:', err);
      alert('Failed to update blog');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-sm bg-white">
      <h2 className="text-2xl font-bold mb-4">Update Blog</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;