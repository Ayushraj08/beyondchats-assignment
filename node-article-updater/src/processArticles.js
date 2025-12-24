import axios from "axios";
import { fetchArticles } from "./fetchArticles.js";
import { summarizeArticle } from "./llm.js";

const API_BASE = "http://127.0.0.1:8000/api";

export async function processArticles() {
  const articles = await fetchArticles();

  for (const article of articles) {
    console.log("PROCESSING:", article.title);

    // Skip already processed articles
    if (article.summary) {
      console.log("⏭ Already processed");
      continue;
    }

    if (!article.content) {
      console.log("⚠ No content, skipping");
      continue;
    }

    const enriched = await summarizeArticle(article.content);

    await axios.post(`${API_BASE}/articles/${article.id}/enrich`, {
      summary: enriched.summary,
      tags: enriched.tags
    });

    console.log("✅ AI saved for:", article.title);
    console.log("----------");
  }
}
