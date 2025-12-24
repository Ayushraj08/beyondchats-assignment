<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\Article;

class MigrateArticlesToSqlite extends Command
{
    protected $signature = 'migrate:mysql-to-sqlite';
    protected $description = 'Copy articles from MySQL (Laragon) to SQLite';

    public function handle(): void
    {
        $this->info('Reading articles from MySQL...');

        $mysqlArticles = DB::connection('mysql_source')
            ->table('articles')
            ->get();

        if ($mysqlArticles->isEmpty()) {
            $this->error('No articles found in MySQL.');
            return;
        }

        $count = 0;

        foreach ($mysqlArticles as $article) {
            Article::updateOrCreate(
                ['slug' => $article->slug],
                [
                    'title' => $article->title,
                    'content' => $article->content,
                    'author' => $article->author,
                    'published_date' => $article->published_date,
                    'summary' => $article->summary ?? null,
                    'tags' => $article->tags ?? null,
                    'ai_processed_at' => $article->ai_processed_at ?? null,

                    // ✅ FIXED
                    'source_url' => $article->source_url
                        ?? 'https://beyondchats.ai/imported',
                ]
            );

            $count++;
        }

        $this->info("✅ Migrated {$count} articles to SQLite successfully.");
    }
}
