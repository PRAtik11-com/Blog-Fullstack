import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  const storedUser = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => { 
    setUser(storedUser);
    fetchPosts();
  },[]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_Base_url}/blogs/`);
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (userId,postId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_Base_url}/blogs/delete/${userId}/${postId}`, {
        withCredentials: true,
    });
      fetchPosts(); 
    } catch (error) {
      console.error("Error deleting post:", error.response.data.message);
    }
  };

  const isOwnerOrAdmin = (postAuthorId) => {
    return user && (user.role === "admin" || user._id === postAuthorId);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📰 Blog Posts
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition duration-300"
            >
              <img
                src={post.blogsImage}
                alt={post.title}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
              <p className="text-sm text-gray-600 mt-1 mb-2">{post.content}</p>
              <p className="text-sm text-gray-600 mt-1 mb-2">{post.tags}</p>
              <p className="text-xs text-gray-500">By: {post.author?.username}</p>

              {isOwnerOrAdmin(post.author?._id) && (
                <div className="mt-3 flex gap-3">
                  <Link
                    to={`/edit/${user._id}/${post._id}`} state={{title:post.title,content:post.content,blogsImage:post.blogsImage,tags:post.tags}}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id,post._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
