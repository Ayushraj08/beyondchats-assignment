<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'content',
        'author',
        'published_date',
        'summary',
        'tags',
        'ai_processed_at',
        'source_url', // ✅ REQUIRED
    ];

    protected $casts = [
        'tags' => 'array',
        'published_date' => 'datetime',
        'ai_processed_at' => 'datetime',
    ];
}
