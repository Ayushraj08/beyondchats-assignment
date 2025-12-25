import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchArticles = async () => {
  const res = await axios.get(`${API_BASE}/articles`);

  if (!res.data || !Array.isArray(res.data.data)) {
    console.error("Unexpected API response:", res.data);
    return [];
  }

  // 🔥 Normalize tags here (KEY FIX)
  return res.data.data.map(article => ({
    ...article,
    tags:
      typeof article.tags === "string"
        ? JSON.parse(article.tags)
        : Array.isArray(article.tags)
        ? article.tags
        : [],
  }));
};

export const fetchArticleBySlug = async (slug) => {
  const res = await axios.get(`${API_BASE}/articles/${slug}`);

  return {
    ...res.data,
    tags:
      typeof res.data.tags === "string"
        ? JSON.parse(res.data.tags)
        : Array.isArray(res.data.tags)
        ? res.data.tags
        : [],
  };
};
