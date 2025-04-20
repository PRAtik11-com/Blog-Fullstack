const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  tags: [
    { 
        type: String 
    }
  ],
  publishedDate: { 
    type: Date, 
    default: Date.now 
  },
  blogsImage:{
    type:String,
    required:true
  }
});

const blogmodel = mongoose.model("blogs", blogSchema);

module.exports = blogmodel;
