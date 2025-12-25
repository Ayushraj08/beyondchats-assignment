import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articles";
import ArticleCard from "../components/ArticleCard";
import "../styles/article.css";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [aiOnly, setAiOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load articles:", err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) return <p className="loading">Loading articles...</p>;
  if (error) return <p className="error">{error}</p>;

  const filtered = articles
    .filter(a => {
      const title = a?.title ?? "";
      const content = a?.content ?? "";
      return (
        title.toLowerCase().includes(search.toLowerCase()) ||
        content.toLowerCase().includes(search.toLowerCase())
      );
    })
    .filter(a => (aiOnly ? Boolean(a.summary) : true));

  return (
    <div className="container">
      <h2 className="page-title">BeyondChats Articles</h2>

      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search articles..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <label className="checkbox">
          <input
            type="checkbox"
            checked={aiOnly}
            onChange={e => setAiOnly(e.target.checked)}
          />
          AI processed only
        </label>
      </div>

      {filtered.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        filtered.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))
      )}
    </div>
  );
}
