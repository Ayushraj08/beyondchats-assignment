export async function summarizeArticle(content) {
    if (!content || typeof content !== "string") {
      return {
        summary: "No content available to summarize.",
        tags: []
      };
    }
  
    return {
      summary: content.slice(0, 150) + "...",
      tags: ["chatbot", "ai", "customer-support"]
    };
  }
  