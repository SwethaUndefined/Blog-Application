import React from "react";
import { Divider, Modal,Typography } from "antd";
import moment from "moment";


const BlogInformation = ({ blog, visible, onClose }) => {
  return (
    <Modal title={blog.title} open={visible} onCancel={onClose} footer={null}>
      <div
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      <Divider/>
      <Typography>Created by: {blog.username}</Typography>
      <Typography>Created At : {moment(blog.date).format("MM/DD/YY, hh:mm")}</Typography>

    </Modal>
  );
};

export default BlogInformation;
