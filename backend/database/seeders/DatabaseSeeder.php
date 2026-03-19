<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::factory()->create([
            'name'     => 'Admin Foodie',
            'email'    => 'admin@foodieapp.com',
            'password' => Hash::make('password'),
            'role'     => 'admin',
        ]);

        Category::factory(10)
            ->has(Product::factory()->count(10))
            ->create();

        $this->command->info('✅ Admin user and fake menu data created successfully!');
    }
}
