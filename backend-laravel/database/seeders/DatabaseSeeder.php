<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Articles Seeder
        |--------------------------------------------------------------------------
        | Seed only required data for BeyondChats.
        | Users are intentionally NOT seeded to avoid
        | PostgreSQL NOT NULL password constraint errors.
        */
        $this->call([
            ArticleSeeder::class,
        ]);
    }
}
