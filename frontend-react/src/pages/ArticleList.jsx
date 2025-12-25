import { useEffect, useState } from "react";
import { fetchArticles } from "@/api/articles.js";
import ArticleCard from "@/components/ArticleCard.jsx";
import SkeletonCard from "@/components/SkeletonCard.jsx";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [aiOnly, setAiOnly] = useState(false);

  useEffect(() => {
    fetchArticles()
      .then(setArticles)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = articles.filter(article => {
    const matchesQuery =
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.content.toLowerCase().includes(query.toLowerCase());

    const matchesAI = aiOnly ? article.ai_processed_at : true;

    return matchesQuery && matchesAI;
  });

  return (
    <div>
      <h1 className="page-title">
        BeyondChats <span>Articles</span>
      </h1>

      {/* 🔍 Search + Toggle */}
      <div className="controls">
        <input
          className="search"
          placeholder="Search articles..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        <label className="toggle">
          <input
            type="checkbox"
            checked={aiOnly}
            onChange={() => setAiOnly(!aiOnly)}
          />
          AI processed only
        </label>
      </div>

      {/* 💀 Skeleton loaders */}
      {loading && (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </>
      )}

      {error && <p>Error: {error}</p>}
      {!loading && !filtered.length && <p>No articles found.</p>}

      {!loading &&
        filtered.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
    </div>
  );
}
