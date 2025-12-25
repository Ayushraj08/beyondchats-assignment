const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://beyondchats-assignment-0hcb.onrender.com/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API Error");
  }

  return res.json();
}

export async function fetchArticles() {
  const res = await request("/articles");
  return Array.isArray(res?.data) ? res.data : [];
}

export async function fetchArticleBySlug(slug) {
  return request(`/articles/${slug}`);
}
