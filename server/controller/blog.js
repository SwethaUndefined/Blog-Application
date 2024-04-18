const Blog = require("../model/blogSchema")
const User = require("../model/user")

module.exports = {
createBlog: async (req, res) => {
    const { title, content, username } = req.body;
    try {
      const existingUser = await User.findOne({ username });
      if (!existingUser) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      const newBlog = new Blog({
        title,
        content,
        username,
      });
      const savedBlog = await newBlog.save();
      res.status(200).json({ success: true, message: 'Blog created successfully', blog: savedBlog });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  },
  getBlogs : async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.status(200).json({ success: true, blogs });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  },
  updateBlog: async (req, res) => {
    const { id, title, content } = req.body;
    try {
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ success: false, error: 'Blog not found' });
      }
      blog.title = title;
      blog.content = content;
      const updatedBlog = await blog.save();
      res.status(200).json({ success: true, message: 'Blog updated successfully', blog: updatedBlog });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  },  
  deleteBlog: async (req, res) => {
    const { blogId } = req.params;
    try {
      const deletedBlog = await Blog.deleteOne({ _id: blogId });
      if (deletedBlog.deletedCount === 0) {
        return res.status(404).json({ success: false, error: "Blog not found" });
      }
      res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
}