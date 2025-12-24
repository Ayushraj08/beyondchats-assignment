<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->text('summary')->nullable()->after('content');
            $table->json('tags')->nullable()->after('summary');
            $table->timestamp('ai_processed_at')->nullable()->after('tags');
        });
    }

    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn(['summary', 'tags', 'ai_processed_at']);
        });
    }
};
