<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * GET /api/articles
     * List articles
     */
    public function index()
    {
        return response()->json([
            'data' => Article::select(
                'id',
                'title',
                'slug',
                'content',
                'author',
                'published_date',
                'summary',          // ✅ expose AI summary
                'tags',             // ✅ expose AI tags
                'ai_processed_at',  // ✅ expose processing state
                'created_at'
            )
            ->orderBy('created_at')
            ->get()
        ]);
    }

    /**
     * GET /api/articles/{slug}
     * Fetch single article by slug
     */
    public function show(string $slug)
    {
        $article = Article::where('slug', $slug)->firstOrFail();
        return response()->json($article);
    }

    /**
     * GET /api/articles/search?q=
     * Search articles
     */
    public function search(Request $request)
    {
        $q = $request->query('q');

        if (!$q) {
            return response()->json([
                'message' => 'Search query is required'
            ], 422);
        }

        $results = Article::where('title', 'like', "%{$q}%")
            ->orWhere('content', 'like', "%{$q}%")
            ->limit(20)
            ->get();

        return response()->json([
            'query' => $q,
            'results' => $results
        ]);
    }

    /**
     * POST /api/articles/{id}/enrich
     * Save AI enrichment
     */
    public function enrich(Request $request, $id)
    {
        $request->validate([
            'summary' => 'required|string',
            'tags' => 'nullable|array'
        ]);

        $article = Article::findOrFail($id);

        $article->update([
            'summary' => $request->summary,
            'tags' => $request->tags ?? [],
            'ai_processed_at' => now(),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Article enriched successfully'
        ]);
    }
    public function triggerEnrichment($id)
{
    $article = Article::findOrFail($id);

    Http::post('http://127.0.0.1:3001/webhook/article-created', [
        'id' => $article->id,
        'title' => $article->title,
        'content' => $article->content,
    ]);

    return response()->json([
        'status' => 'queued',
        'message' => 'Article sent for AI processing'
    ]);
}
}
