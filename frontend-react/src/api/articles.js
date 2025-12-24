import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export const fetchArticles = async () => {
  const res = await axios.get(`${API_BASE}/articles`);
  return res.data.data;
};

export const fetchArticleBySlug = async (slug) => {
  const res = await axios.get(`${API_BASE}/articles/${slug}`);
  return res.data;
};
