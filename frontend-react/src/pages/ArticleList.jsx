import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articles";
import ArticleCard from "../components/ArticleCard";
import "../styles/article.css";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [aiOnly, setAiOnly] = useState(false);

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  const filtered = articles
    .filter(a =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase())
    )
    .filter(a => (aiOnly ? a.summary : true));

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

      {filtered.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
