import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleBySlug } from "../api/articles";
import { normalizeTags } from "../utils/tags.js";

export default function ArticleView() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticleBySlug(slug)
      .then(setArticle)
      .catch(err => setError(err.message));
  }, [slug]);

  if (error) return <p>Error: {error}</p>;
  if (!article) return <p>Loading...</p>;

  const tags = normalizeTags(article.tags);

  return (
    <div className="article-view">
      <h1>{article.title}</h1>
      <p>{article.content}</p>

      <div className="tags">
        {tags.map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </div>
    </div>
  );
}
