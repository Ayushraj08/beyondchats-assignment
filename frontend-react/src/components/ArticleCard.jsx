import { Link } from "react-router-dom";
import { normalizeTags } from "@/utils/tags.js";

export default function ArticleCard({ article }) {
  const tags = normalizeTags(article.tags);

  return (
    <div className="article-card">
      <h2>{article.title}</h2>
      <p>{article.summary || article.content?.slice(0, 120) + "..."}</p>

      <div className="tags">
        {tags.map((tag, i) => (
          <span key={i} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <Link to={`/article/${article.slug}`}>Read More →</Link>
    </div>
  );
}
