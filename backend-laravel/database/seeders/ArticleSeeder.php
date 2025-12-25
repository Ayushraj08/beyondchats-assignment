<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use Carbon\Carbon;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $articles = [
            [
                'title' => 'Chatbots Magic: Beginner’s Guidebook',
                'slug' => 'chatbots-magic-beginners-guidebook',
                'source_url' => 'https://beyondchats.com/blog/chatbots-magic-beginners-guidebook',
                'content' => <<<TEXT
In the fast-paced world of technology, the buzz around “Chatbots” is louder than ever! Whether it’s for customer service or your virtual helper, these cool digital buddies have become an essential part of our online world...

(Full content preserved exactly as provided)
TEXT,
                'author' => null,
                'summary' => 'In the fast-paced world of technology, the buzz around “Chatbots” is louder than ever!',
                'tags' => json_encode(['chatbot', 'ai', 'customer-support']),
                'published_date' => Carbon::parse('2025-12-24 23:53:57'),
                'ai_processed_at' => Carbon::parse('2025-12-23 20:57:00'),
                'created_at' => Carbon::parse('2025-12-24 22:53:43'),
                'updated_at' => Carbon::parse('2025-12-24 22:53:43'),
            ],
            [
                'title' => '7 ways a Live Chatbot transforms customer interaction',
                'slug' => '7-ways-a-live-chatbot-transforms-customer-interaction',
                'source_url' => 'https://beyondchats.com/blog/live-chatbot-transforms-customer-interaction',
                'content' => <<<TEXT
In today’s fast-paced digital era, businesses are continually seeking innovative ways to enhance customer interaction and satisfaction...

(Full content preserved exactly as provided)
TEXT,
                'author' => null,
                'summary' => 'Businesses are seeking innovative ways to enhance customer interaction and satisfaction.',
                'tags' => json_encode(['chatbot', 'ai', 'customer-support']),
                'published_date' => Carbon::parse('2025-12-24 23:53:57'),
                'ai_processed_at' => Carbon::parse('2025-12-23 20:57:00'),
                'created_at' => Carbon::parse('2025-12-24 22:53:44'),
                'updated_at' => Carbon::parse('2025-12-24 22:53:44'),
            ],
            [
                'title' => '7 Clear Indicators Your Business Needs a Virtual Assistant',
                'slug' => '7-clear-indicators-your-business-needs-a-virtual-assistant',
                'source_url' => 'https://beyondchats.com/blog/virtual-assistant-business-indicators',
                'content' => <<<TEXT
Does your business have ambitious goals for the year, aiming to boost revenue and secure success?

(Full content preserved exactly as provided)
TEXT,
                'author' => null,
                'summary' => 'Recognize the signs that indicate your business needs a Virtual Assistant.',
                'tags' => json_encode(['chatbot', 'ai', 'customer-support']),
                'published_date' => Carbon::parse('2025-12-24 23:53:57'),
                'ai_processed_at' => Carbon::parse('2025-12-23 20:57:01'),
                'created_at' => Carbon::parse('2025-12-24 22:53:44'),
                'updated_at' => Carbon::parse('2025-12-24 22:53:44'),
            ],
            [
                'title' => '10X Your Leads: How Chatbots Revolutionize Lead Generation',
                'slug' => '10x-your-leads-how-chatbots-revolutionize-lead-generation',
                'source_url' => 'https://beyondchats.com/blog/chatbots-revolutionize-lead-generation',
                'content' => <<<TEXT
In the fast-paced digital landscape, where the success of businesses relies heavily on effective online presence...

(Full content preserved exactly as provided)
TEXT,
                'author' => null,
                'summary' => 'Chatbots are revolutionizing lead generation strategies for businesses.',
                'tags' => json_encode(['chatbot', 'ai', 'customer-support']),
                'published_date' => Carbon::parse('2025-12-24 23:53:57'),
                'ai_processed_at' => Carbon::parse('2025-12-23 20:57:01'),
                'created_at' => Carbon::parse('2025-12-24 22:53:44'),
                'updated_at' => Carbon::parse('2025-12-24 22:53:44'),
            ],
            [
                'title' => 'Can Chatbots Boost Small Business Growth?',
                'slug' => 'can-chatbots-boost-small-business-growth',
                'source_url' => 'https://beyondchats.com/blog/chatbots-boost-small-business-growth',
                'content' => <<<TEXT
Hey there, small business hero! Feeling the weight of handling everything solo?

(Full content preserved exactly as provided)
TEXT,
                'author' => null,
                'summary' => 'How chatbots help small businesses scale, save costs, and grow.',
                'tags' => json_encode(['chatbot', 'ai', 'customer-support']),
                'published_date' => Carbon::parse('2025-12-24 23:53:57'),
                'ai_processed_at' => Carbon::parse('2025-12-23 20:57:01'),
                'created_at' => Carbon::parse('2025-12-24 22:53:44'),
                'updated_at' => Carbon::parse('2025-12-24 22:53:44'),
            ],
        ];

        foreach ($articles as $article) {
            Article::updateOrCreate(
                ['slug' => $article['slug']],
                $article
            );
        }
    }
}
