import { useEffect, useState } from "react";
import { fetchArticles } from "@/api/articles.js";
import ArticleCard from "@/components/ArticleCard.jsx";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticles()
      .then(setArticles)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app-container">
      <h1 className="page-title">
        BeyondChats <span>Articles</span>
      </h1>

      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search articles..."
        />

        <label className="checkbox">
          <input type="checkbox" />
          AI processed only
        </label>
      </div>

      {loading && <p className="loading">Loading articles…</p>}
      {error && <p>{error}</p>}

      <div className="article-list">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
