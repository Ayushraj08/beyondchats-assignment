import axios from "axios";

/**
 * API base URL
 * - Local dev: VITE_API_BASE_URL=http://127.0.0.1:8000/api
 * - Production: VITE_API_BASE_URL=https://beyondchats-assignment-0hcb.onrender.com/api
 */
const API_BASE = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE) {
  console.error("VITE_API_BASE_URL is not defined");
}

export const fetchArticles = async () => {
  const res = await axios.get(`${API_BASE}/articles`);
  return res.data.data;
};

export const fetchArticleBySlug = async (slug) => {
  const res = await axios.get(`${API_BASE}/articles/${slug}`);
  return res.data;
};
