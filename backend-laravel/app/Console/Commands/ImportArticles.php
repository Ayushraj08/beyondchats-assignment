<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use Illuminate\Support\Str;

class ImportArticles extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'articles:import';

    /**
     * The console command description.
     */
    protected $description = 'Import scraped BeyondChats articles from JSON file';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $path = storage_path('app/data/oldest_articles.json');

        if (!file_exists($path)) {
            $this->error('JSON file not found at: ' . $path);
            return Command::FAILURE;
        }

        $articles = json_decode(file_get_contents($path), true);

        if (!is_array($articles)) {
            $this->error('Invalid JSON format.');
            return Command::FAILURE;
        }

        $imported = 0;
        $skipped  = 0;

        foreach ($articles as $index => $article) {

            // ✅ JSON schema-safe extraction
            $sourceUrl = $article['source_url'] ?? null;
            $title     = $article['title'] ?? null;
            $content   = $article['content'] ?? null;

            if (!$sourceUrl || !$title || !$content) {
                $skipped++;
                $this->warn("Skipped article at index {$index} due to missing required fields.");
                continue;
            }

            Article::updateOrCreate(
                ['source_url' => $sourceUrl],
                [
                    'title'          => $title,
                    'slug'           => Str::slug($title),
                    'content'        => $content,
                    'author'         => $article['author'] ?? null,
                    'published_date' => $article['published_date'] ?? null,
                ]
            );

            $imported++;
        }

        $this->info("Import completed. Imported: {$imported}, Skipped: {$skipped}");

        return Command::SUCCESS;
    }
}
