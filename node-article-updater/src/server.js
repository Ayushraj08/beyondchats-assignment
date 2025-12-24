import express from "express";
import axios from "axios";
import { summarizeArticle } from "./llm.js";

const app = express();
app.use(express.json());

app.post("/webhook/article-created", async (req, res) => {
  const { id, title, content } = req.body;

  console.log("🔔 Webhook received:", title);

  const enriched = await summarizeArticle(content);

  await axios.post(
    `http://127.0.0.1:8000/api/articles/${id}/enrich`,
    {
      summary: enriched.summary,
      tags: enriched.tags,
    }
  );

  console.log("✅ AI saved for:", title);

  res.json({ status: "processed" });
});

app.listen(3001, () => {
  console.log("🚀 AI Webhook Server running on port 3001");
});
