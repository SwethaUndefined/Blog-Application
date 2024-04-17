import React, { useState, useEffect } from "react";
import "./dashboard.css";
import {
  Row,
  Col,
  Typography,
  Space,
  Avatar,
  Button,
  Modal,
  Form,
  Input,
  message,
  Card,
  Divider,
} from "antd";
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import RichTextEditor from "../components/richTextEditor";
import { createBlog, getBlogs, updateBlog, deleteBlog } from "../api";
import BlogInformation from "../components/blogInformation";
import moment from "moment";
import { addBlogReducer, updateBlogReducer, deleteBlogReducer, setBlogsReducer } from "../store/blog";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showBlog, setShowBlog] = useState(false);
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blog.blogs);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getBlogs();
      if (response.success) {
        dispatch(setBlogsReducer(response.blogs));
      } else {
        console.error("Error fetching blogs:", response.error);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const showModal = (blog) => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setEditingBlogId(blog._id);
    } else {
      setTitle("");
      setContent("");
      setEditingBlogId(null);
    }
    setModalVisible(true);
  };

  const showDeleteModal = (blog) => {
    setBlogToDelete(blog);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      await deleteBlog(blogToDelete._id);
      dispatch(deleteBlogReducer(blogToDelete._id))
      setDeleteModalVisible(false);
      fetchBlogs();
      message.success("Blog Deleted Successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setTitle("");
    setContent("");
  };

  const handleCreateBlog = async () => {
    try {
      setModalVisible(true);
      const response = await createBlog({ title, content, username });
      dispatch(addBlogReducer(response.blog));
      setModalVisible(false);
      setTitle("");
      setContent("");
      message.success("Blog Created Successfully");
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  const handleUpdateBlog = async () => {
    try {
      setModalVisible(true);
      await updateBlog({ id: editingBlogId, title, content });
      dispatch(updateBlogReducer({ id: editingBlogId, title, content }));
      setModalVisible(false);
      setTitle("");
      setContent("");
      setEditingBlogId(null);
      message.success("Blog Updated Successfully");
    } catch (error) {
      console.error("Error updating blog post:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.setItem("isLoggedIn", "false");
    sessionStorage.removeItem("username");
    window.location.href = "/";
  };

  const handleLogoutConfirmation = () => {
    setLogoutModalVisible(true);
  };

  const handleCancelLogout = () => {
    setLogoutModalVisible(false);
  };
  const handleCardClick = (blog) => {
    setSelectedBlog(blog);
    setShowBlog(blog);
  };

  return (
    <section className="dashboard-section">
      <Row>
        <Col span={24} className="header">
          <Space>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              className="UserOutlined"
            />
            <Typography className="name">{username}!</Typography>
            <Button onClick={handleLogoutConfirmation}>Logout</Button>
          </Space>
        </Col>
      </Row>
      <Row style={{ padding: "10px" }}>
        <Col span={24}>
          <Typography className="welcome-text">
            Welcome to Blog Application
          </Typography>
        </Col>
        <Col span={24} className="createBlog">
          <Button
            className="createBlog-btn"
            onClick={handleCreateBlog}
            xs={24}
            sm={12}
            md={8}
            lg={6}
          >
            Create Blog
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ padding: "10px" }}>
        {blogs.map((blog) => (
          <Col key={blog._id} xs={24} sm={12} md={8} lg={6}>
            <Card title={blog.title} bordered={false}>
              <div
                onClick={() => handleCardClick(blog)}
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="content-preview"
              />
              <p>{blog.date}</p>
              <Divider />
              <Space>
                <Typography>Created by: {blog.username}</Typography>
                <Space>
                  <EditOutlined
                    className="edit-icon"
                    onClick={() => showModal(blog)}
                  />
                  <DeleteOutlined onClick={() => showDeleteModal(blog)} />
                </Space>
              </Space>
              <Typography>
                Created At: {moment(blog.createdAt).format("MM/DD/YY, hh:mm")}
              </Typography>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={editingBlogId ? "Update Blog" : "Create New Blog"}
        open={modalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="create"
            type="primary"
            onClick={editingBlogId ? handleUpdateBlog : handleCreateBlog}
          >
            {editingBlogId ? "Update" : "Create"}
          </Button>,
        ]}
        maskClosable={false}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item label="Content">
            <RichTextEditor value={content} onChange={setContent} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete Blog"
        open={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onOk={handleDelete}
      >
        <p>Are you sure you want to delete this blog?</p>
      </Modal>
      <Modal
        title="Logout Confirmation"
        open={logoutModalVisible}
        onOk={handleLogout}
        onCancel={handleCancelLogout}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
      {selectedBlog && (
        <BlogInformation
          blog={selectedBlog}
          visible={showBlog}
          onClose={() => setShowBlog(false)}
        />
      )}
    </section>
  );
};

export default Dashboard;
