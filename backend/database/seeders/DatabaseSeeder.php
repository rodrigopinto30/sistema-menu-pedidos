<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;


    public function run(): void
    {
        \App\Models\User::updateOrCreate(
            ['email' => 'admin@foodieapp.com'],
            [
                'name' => 'Admin Foodie',
                'password' => bcrypt('password'),
                'role' => 'admin',
            ]
        );

        if (\App\Models\Product::count() === 0) {
            \App\Models\Category::factory(5)->create()->each(function ($category) {
                \App\Models\Product::factory(10)->create(['category_id' => $category->id]);
            });
            $this->command->info('Fake data created successfully!');
        } else {
            $this->command->info('Skip seeding: Products already exist.');
        }
    }
}
