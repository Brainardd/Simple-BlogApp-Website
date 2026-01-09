import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { createBlog } from '../../features/blog/blogSlice';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createBlog({ title, content }));
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl mb-4">Create Blog</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 rounded" required />
        <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">Create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
