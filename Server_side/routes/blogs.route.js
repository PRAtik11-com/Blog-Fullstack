const express = require("express");
const { createPost, updatePost, deletePost, getAllPosts } = require("../controller/blogs.controller");
const isAuth = require("../Middleware/Auth.middelware");

const blogsrouter = express.Router();


blogsrouter.post("/create", isAuth, createPost);

blogsrouter.get("/", getAllPosts);

blogsrouter.patch("/update/:userId/:postId", isAuth, updatePost);

blogsrouter.delete("/delete/:userId/:postId", isAuth, deletePost);

module.exports = blogsrouter;
