import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const loginCheck = async (values) => {
  try {
    const res = await instance.post("/login", values);
    return res.data;
  } catch (error) {
    console.error("LoginCheck::error", error);
    throw error;
  }
};

export const registerUser = async (values) => {
  try {
    const res = await instance.post(`/register`, values);
    return res.data;
  } catch (error) {
    console.error("Register::error", error);
    throw error;
  }
};

export const createBlog = async (blogData) => {
  try {
    const res = await instance.post(`/createBlog`, blogData);
    return res.data;
  } catch (error) {
    console.error("CreateBlog::error", error);
    throw error;
  }
}
export const getBlogs = async () => {
  try {
    const res = await instance.get(`/getBlogs`);
    return res.data;
  } catch (error) {
    console.error("CreateBlog::error", error);
    throw error;
  }
}
export const updateBlog = async (blogData) => {
  try {
    const res = await instance.put(`/updateBlog`, blogData);
    return res.data;
  } catch (error) {
    console.error("UpdateBlog::error", error);
    throw error;
  }
}

export const deleteBlog = async (id) => {
  try {
    const res = await instance.delete(`/deleteBlog/${id}`); 
    return res.data;
  } catch (error) {
    console.error("DeleteBlog::error", error);
    throw error;
  }
}
export const verifyEmailCheck = async (token) => {
  try {
    const response = await instance.get(`/users/confirm/${token}`);
    return response.data;
  } catch (error) {
    console.error('Error in verifying email:', error);
    throw error;
  }
};
export const requestPasswordReset = async (email) => {
  try {
    const res = await instance.post("/forgotPassword", email );
    return res.data;
  } catch (error) {
    console.error("ForgotPassword::error", error);
    throw error;
  }
};

export const resetPassword = async (token) => {
  try {
    const response = await instance.get(`/users/reset-password/${token}`);
    return response.data;
  } catch (error) {
    console.error('Error in reset Password:', error);
    throw error;
  }
};
export const updatePassword = async (email, newPassword,token) => {
  try {
    const res = await instance.post(`/update-password`, { email, newPassword,token });
    return res.data;
  } catch (error) {
    console.error("UpdatePassword::error", error);
    throw error;
  }
};



