import { useNavigate } from "react-router-dom";

export default function ArticleCard({ article }) {
  const navigate = useNavigate();

  return (
    <div
      className="article-card"
      onClick={() => navigate(`/article/${article.slug}`)}
    >
      <h3 className="article-title">{article.title}</h3>

      <p className="article-summary">
        {article.summary
          ? article.summary
          : article.content.slice(0, 160) + "..."}
      </p>

      <div className="article-footer">
        <div className="tags">
          {article.tags?.map((tag, i) => (
            <span key={i} className="tag">#{tag}</span>
          ))}
        </div>

        <span
          className={`status ${
            article.summary ? "ai" : "pending"
          }`}
        >
          {article.summary ? "AI Enriched" : "Processing"}
        </span>
      </div>
    </div>
  );
}
