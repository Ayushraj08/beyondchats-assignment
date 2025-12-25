import { Link } from "react-router-dom";
import { normalizeTags } from "@/utils/tags.js";

export default function ArticleCard({ article }) {
  const tags = normalizeTags(article.tags);
  const isAI = Boolean(article.ai_processed_at);

  return (
    <div className="article-card">
      <h2 className="article-title">{article.title}</h2>

      <p className="article-summary">
        {article.summary || article.content?.slice(0, 120) + "..."}
      </p>

      <div className="tags">
        {tags.map((tag, i) => (
          <span key={i} className="tag">
            #{tag}
          </span>
        ))}
      </div>

      <div className="article-footer">
        <Link className="read-more" to={`/article/${article.slug}`}>
          Read More →
        </Link>

        {isAI && <span className="status ai">AI Enriched</span>}
      </div>
    </div>
  );
}
