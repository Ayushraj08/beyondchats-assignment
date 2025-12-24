import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleBySlug } from "../api/articles";
import "../styles/article.css";

export default function ArticleView() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticleBySlug(slug).then(setArticle);
  }, [slug]);

  if (!article) return <p className="loading">Loading...</p>;

  return (
    <div className="container">
      <h1 className="article-title">{article.title}</h1>

      {article.summary && (
        <div className="ai-summary">
          <strong>AI Summary</strong>
          <p>{article.summary}</p>
        </div>
      )}

      <div className="article-content">
        {article.content.split("\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
