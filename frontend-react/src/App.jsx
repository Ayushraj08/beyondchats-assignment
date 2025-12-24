import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArticleList from "./pages/ArticleList";
import ArticleView from "./pages/ArticleView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/article/:slug" element={<ArticleView />} />
      </Routes>
    </BrowserRouter>
  );
}
