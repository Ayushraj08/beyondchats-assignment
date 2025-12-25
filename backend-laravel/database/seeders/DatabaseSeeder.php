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
        | Default Test User (idempotent & SQLite-safe)
        |--------------------------------------------------------------------------
        | Prevents duplicate user creation on redeploy
        */
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['name' => 'Test User']
        );

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
