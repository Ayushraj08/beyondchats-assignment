import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { normalizeTags } from "@/utils/tags.js";

export default function ArticleCard({ article }) {
  const tags = normalizeTags(article.tags);

  return (
    <motion.div
      className="article-card"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <h2>{article.title}</h2>

      <p className="summary">
        {article.summary || article.content?.slice(0, 140) + "..."}
      </p>

      <div className="tags">
        {tags.map((tag, i) => (
          <span key={i} className="tag">#{tag}</span>
        ))}
      </div>

      <div className="card-footer">
        <Link to={`/article/${article.slug}`} className="read-more">
          Read More →
        </Link>

        {article.ai_processed_at && (
          <span className="badge">AI Enriched</span>
        )}
      </div>
    </motion.div>
  );
}
