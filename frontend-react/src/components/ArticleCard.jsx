import { useNavigate } from "react-router-dom";

export default function ArticleCard({ article }) {
  const navigate = useNavigate();

  // ✅ Normalize tags (string | array | null → array)
  let tags = [];
  if (Array.isArray(article.tags)) {
    tags = article.tags;
  } else if (typeof article.tags === "string") {
    try {
      tags = JSON.parse(article.tags);
    } catch {
      tags = [];
    }
  }

  return (
    <div
      className="article-card"
      onClick={() => navigate(`/article/${article.slug}`)}
    >
      <h3 className="article-title">{article.title}</h3>

      <p className="article-summary">
        {article.summary
          ? article.summary
          : article.content?.slice(0, 160) + "..."}
      </p>

      <div className="article-footer">
        <div className="tags">
          {tags.map((tag, i) => (
            <span key={i} className="tag">#{tag}</span>
          ))}
        </div>

        <span className={`status ${article.summary ? "ai" : "pending"}`}>
          {article.summary ? "AI Enriched" : "Processing"}
        </span>
      </div>
    </div>
  );
}
