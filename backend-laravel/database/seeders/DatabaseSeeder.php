<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;

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
        | Default Test User (kept as-is)
        |--------------------------------------------------------------------------
        */
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Articles Seeder
        |--------------------------------------------------------------------------
        */
        $this->call([
            ArticleSeeder::class,
        ]);
    }
}
