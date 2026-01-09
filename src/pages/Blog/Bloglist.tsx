import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchBlogs, deleteBlog, selectBlogs } from '../../features/blog/blogSlice';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector(selectBlogs);
  const loading = useAppSelector((state) => state.blog.loading);
  const totalCount = useAppSelector((state) => state.blog.totalCount);
  const user = useAppSelector((state) => state.auth.user);

  const [page, setPage] = useState(1);
  const limit = 5;
  const totalPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    dispatch(fetchBlogs({ page, limit }));
  }, [dispatch, page]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      await dispatch(deleteBlog(id));
      dispatch(fetchBlogs({ page, limit }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h2 className="text-2xl mb-4">Blogs</h2>

      {user && (
        <Link
          to="/create"
          className="bg-blue-500 text-white p-2 rounded mb-4 inline-block hover:bg-blue-600 transition"
        >
          Create Blog
        </Link>
      )}

      {loading && <p>Loading...</p>}

      {blogs.map((blog) => (
        <div key={blog.id} className="border p-4 mb-4 rounded shadow-sm">
          <h3 className="text-xl font-semibold">{blog.title}</h3>
          <p className="mt-2">{blog.content}</p>

          {user && (
            <div className="mt-2 flex gap-2">
              <Link
                to={`/update/${blog.id}`}
                className="bg-green-500 text-white p-1 rounded hover:bg-green-600 transition"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(blog.id)}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="p-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages || totalPages === 0}
          className="p-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogList;
