import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchArticles = async () => {
  const res = await axios.get(`${API_BASE}/articles`);

  // Laravel returns: { data: [...] }
  if (!res.data || !Array.isArray(res.data.data)) {
    console.error("Unexpected API response:", res.data);
    return [];
  }

  return res.data.data;
};

export const fetchArticleBySlug = async (slug) => {
  const res = await axios.get(`${API_BASE}/articles/${slug}`);
  return res.data;
};
