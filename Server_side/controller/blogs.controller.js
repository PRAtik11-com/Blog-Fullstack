const blogmodel = require("../model/blogs.model");

//create by both
const createPost = async (req, res) => {
  const { title, content, tags, blogsImage } = req.body;

  if (!title || !content || !tags || !blogsImage) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    const newPost = await blogmodel.create({
      title,
      content,
      tags,
      blogsImage,
      author: req.User._id 
    });

    res.status(201).json({ message: 'Blog post created successfully', post: newPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by all
const getAllPosts = async (req, res) => {
  try {
    const posts = await blogmodel.find().populate('author', 'username email');
    res.status(200).json({ message: "Blogs fetched successfully", posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update by both
const updatePost = async (req, res) => {
  const { userId, postId } = req.params; 
  const { title, content, tags, blogsImage } = req.body;

  try {
    const post = await blogmodel.findById(postId); 
    if (!post) return res.status(404).json({ message: 'Post not found' });

   
    const isOwner = post.author.toString() === userId; 
    const isAdmin = req.User.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const updatedPost = await blogmodel.findByIdAndUpdate(
      postId,
      { $set: { title, content, tags, blogsImage } },
      { new: true }
    );

    res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete by both
const deletePost = async (req, res) => {
  const { userId, postId } = req.params; 

  try {
    const post = await blogmodel.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    
    const isOwner = post.author.toString() === userId; 
    const isAdmin = req.User.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    await blogmodel.findByIdAndDelete(postId); 
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost
};
