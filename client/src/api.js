import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});



export const registerUser = async (values) => {
  try {
    const res = await instance.post("/user/register", values);
    return res.data;
  } catch (error) {
    console.error("Register::error", error);
    throw error;
  }
};
export const loginCheck = async (values) => {
  console.log(values)
  try {
    const res = await instance.post("/user/login/", values);
    return res.data;
  } catch (error) {
    console.error("LoginCheck::error", error);
    throw error;
  }
};
export const createBlog = async (blogData) => {
  try {
    const res = await instance.post("/blog/createBlog", blogData);
    return res.data;
  } catch (error) {
    console.error("CreateBlog::error", error);
    throw error;
  }
}

export const getBlogs = async (username) => {
  try {
    const res = await instance.get(`/blog/getBlogs`);
    return res.data;
  } catch (error) {
    console.error("GetBlogs::error", error);
    throw error;
  }
}

export const updateBlog = async (blogData) => {
  try {
    const res = await instance.put("/blog/updateBlog", blogData);
    return res.data;
  } catch (error) {
    console.error("UpdateBlog::error", error);
    throw error;
  }
}

export const deleteBlog = async (id) => {
  try {
    const res = await instance.delete(`/blog/deleteBlog/${id}`);
    return res.data;
  } catch (error) {
    console.error("DeleteBlog::error", error);
    throw error;
  }
}

export const verifyEmailCheck = async (token) => {
  console.log({token})
  try {
    const response = await instance.get(`/user/verifyEmailCheck/${token}`);
    return response.data;
  } catch (error) {
    console.error('Error in verifying email:', error);
    throw error;
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const res = await instance.post("/user/forgotPassword", email );
    return res.data;
  } catch (error) {
    console.error("ForgotPassword::error", error);
    throw error;
  }
};

export const updatePassword = async (email, newPassword, token) => {
  try {
    const res = await instance.post(`/user/update-password`, { email, newPassword, token });
    return res.data;
  } catch (error) {
    console.error("UpdatePassword::error", error);
    throw error;
  }
};
