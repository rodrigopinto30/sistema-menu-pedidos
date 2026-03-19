<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->unique()->words(1, true);
        return [
            'name'      => ucfirst($name),
            'slug'      => \Illuminate\Support\Str::slug($name),
            'image'     => 'https://loremflickr.com/640/480/food',
            'is_active' => true,
        ];
    }
}
