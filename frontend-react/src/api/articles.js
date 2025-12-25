import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchArticles = async () => {
  const res = await axios.get(`${API_BASE}/articles`);

  if (!res.data || !Array.isArray(res.data.data)) {
    console.error("Unexpected API response:", res.data);
    return [];
  }

  // ✅ Normalize tags here once
  return res.data.data.map(article => ({
    ...article,
    tags:
      typeof article.tags === "string"
        ? (() => {
            try {
              return JSON.parse(article.tags);
            } catch {
              return [];
            }
          })()
        : Array.isArray(article.tags)
        ? article.tags
        : [],
  }));
};

export const fetchArticleBySlug = async (slug) => {
  const res = await axios.get(`${API_BASE}/articles/${slug}`);

  const article = res.data;

  return {
    ...article,
    tags:
      typeof article.tags === "string"
        ? (() => {
            try {
              return JSON.parse(article.tags);
            } catch {
              return [];
            }
          })()
        : Array.isArray(article.tags)
        ? article.tags
        : [],
  };
};
