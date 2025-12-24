<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ArticleController;

Route::get('/health', fn () => response()->json(['status' => 'ok']));

Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/search', [ArticleController::class, 'search']);
Route::get('/articles/{slug}', [ArticleController::class, 'show']);
Route::post('/articles/{id}/enrich', [ArticleController::class, 'enrich']);
Route::post('/articles/{id}/trigger-ai', [ArticleController::class, 'triggerEnrichment']);

