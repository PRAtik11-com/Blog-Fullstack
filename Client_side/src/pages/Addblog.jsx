import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogsImage, setImage] = useState("");
  const [tags,setTags] = useState([])

  const navigate = useNavigate();

  const handleAddBlog = (e) => {
    e.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_Base_url}/blogs/create`,
        { title, content, blogsImage,tags },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Blog Created:", response.data);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error creating blog:", err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl animate-fade-in-up transition-all duration-500">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-3">
          📝 Add Blog
        </h1>
        <p className="text-center text-gray-500 mb-6">Write and share your thoughts</p>
        <form onSubmit={handleAddBlog} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog Title"
              required
              className="w-full p-3 rounded-md border focus:ring-green-400 focus:outline-none transition-all placeholder-gray-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Blog Title"
              required
              className="w-full p-3 rounded-md border focus:ring-green-400 focus:outline-none transition-all placeholder-gray-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              value={blogsImage}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/blog-image.jpg"
              required
              className="w-full p-3 rounded-md border focus:ring-green-400 focus:outline-none transition-all placeholder-gray-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              required
              className="w-full p-3 rounded-md border min-h-[100px] focus:ring-green-400 focus:outline-none transition-all placeholder-gray-400"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-medium transition duration-300"
          >
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
