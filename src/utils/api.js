import axios from "axios";

// Base URL for your Express backend (adjust when backend runs on another port)
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// User Signup
export const signup = async (userData) => {
  try {
    const res = await API.post("/auth/signup", userData);
    return res.data;
  } catch (err) {
    console.error("Signup error:", err);
    throw err;
  }
};

// User Login
export const login = async (credentials) => {
  try {
    const res = await API.post("/auth/login", credentials);
    return res.data;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
};

// Fetch Projects
export const fetchProjects = async () => {
  try {
    const res = await API.get("/projects");
    return res.data;
  } catch (err) {
    console.error("Fetch projects error:", err);
    throw err;
  }
};
