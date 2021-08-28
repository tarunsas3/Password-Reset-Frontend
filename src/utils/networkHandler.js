import axios from "axios";

const URL = "https://password-reset-tarun.herokuapp.com";

export const login = async (formData) => {
  let { data } = await axios.post(`${URL}/login`, formData);
  return data;
};

export const signup = async (formData) => {
  let { data } = await axios.post(`${URL}/signup`, formData);
  return data;
};

export const forgotPassword = async (email) => {
  let { data } = await axios.post(`${URL}/forgot-password`, { email });
  return data;
};

export const verifyResetURL = async (obj) => {
  let { data } = await axios.post(`${URL}/verify-resetURL`, obj);
  return data;
};

export const resetPassword = async (obj) => {
  let { data } = await axios.post(`${URL}/reset-password`, obj);
  return data;
};
