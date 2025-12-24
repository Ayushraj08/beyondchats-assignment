<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'content',
        'author',
        'published_date',
        'summary',
        'tags',
        'ai_processed_at'
    ];

    protected $casts = [
        'tags' => 'array',
        'published_date' => 'date',
        'ai_processed_at' => 'datetime'
    ];
}
