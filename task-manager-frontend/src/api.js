// import axios from "axios";

// const API_URL = "http://localhost:5000/api/auth"; // change if backend deployed

// export const registerUser = (data) =>
//   axios.post(`${API_URL}/auth/register`, data);

// export const loginUser = (data) =>
//   axios.post(`${API_URL}/auth/login`, data);

// export const getTasks = (token) =>
//   axios.get(`${API_URL}/tasks`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const addTask = (token, data) =>
//   axios.post(`${API_URL}/tasks`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const deleteTask = (token, id) =>
//   axios.delete(`${API_URL}/tasks/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const toggleTask = (token, id) =>
//   axios.put(`${API_URL}/tasks/${id}/toggle`, {}, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// src/api.js
// src/api.js
// src/api.js
// src/api.js
import axios from "axios";

const API_URL = "http://localhost:5000/api"; // backend URL

// Auth
export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);

// Tasks
export const getTasks = (token) =>
  axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addTask = (data, token) =>
  axios.post(`${API_URL}/tasks`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteTask = (id, token) =>
  axios.delete(`${API_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Corrected: mark task completed
export const toggleTask = (token, id) =>
  axios.patch(`${API_URL}/tasks/${id}/complete`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
