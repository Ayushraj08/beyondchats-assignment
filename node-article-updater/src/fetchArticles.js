import axios from "axios";

export async function fetchArticles() {
  const res = await axios.get("http://127.0.0.1:8000/api/articles");
  return res.data.data;
}
