import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Editblog = () => {
  const location = useLocation();
  const {title,content,tags,blogsImage} = location.state;
   
  const [edittitle, seteditTitle] = useState(title);
  const [editcontent, seteditContent] = useState(content);
  const [editblogsImage, seteditImage] = useState(blogsImage);
  const [edittags,seteditTags] = useState(tags)

  const navigate = useNavigate();
  const { userId,postId } = useParams();

  const handleEditBlog = (e) => {
    e.preventDefault();


    axios.patch(`${import.meta.env.VITE_Base_url}/blogs/update/${userId}/${postId}`,
        {
          title:edittitle, 
          content:editcontent, 
          blogsImage:editblogsImage,
          tags:edittags 
          },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Blog Edited:", response);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error editing blog:", err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl animate-fade-in-up transition-all duration-500">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-3">
          📝 Add Blog
        </h1>
        <p className="text-center text-gray-500 mb-6">Write and share your thoughts</p>
        <form onSubmit={handleEditBlog} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={edittitle}
              onChange={(e) => seteditTitle(e.target.value)}
              placeholder="Blog Title"
              required
              className="w-full p-3 rounded-md border focus:ring-green-400 focus:outline-none transition-all placeholder-gray-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Tags</label>
            <input
              type="text"
              value={edittags}
              onChange={(e) => seteditTags(e.target.value)}
              placeholder="Blog Title"
              required
              className="w-full p-3 rounded-md border focus:ring-green-400 focus:outline-none transition-all placeholder-gray-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              value={editblogsImage}
              onChange={(e) => seteditImage(e.target.value)}
              placeholder="https://example.com/blog-image.jpg"
              required
              className="w-full p-3 rounded-md border focus:ring-green-400 focus:outline-none transition-all placeholder-gray-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={editcontent}
              onChange={(e) => seteditContent(e.target.value)}
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

export default Editblog;

