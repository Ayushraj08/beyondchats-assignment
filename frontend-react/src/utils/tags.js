// src/utils/tags.js
export function normalizeTags(tags) {
    if (!tags) return [];
  
    if (Array.isArray(tags)) return tags;
  
    if (typeof tags === "string") {
      try {
        const parsed = JSON.parse(tags);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
  
      return tags
        .replace(/[\[\]"]/g, "")
        .split(",")
        .map(t => t.trim())
        .filter(Boolean);
    }
  
    return [];
  }
  