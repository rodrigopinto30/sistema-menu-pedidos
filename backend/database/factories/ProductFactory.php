<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->unique()->words(2, true);
        return [
            'category_id'  => \App\Models\Category::factory(),
            'name'         => ucfirst($name),
            'slug'         => \Illuminate\Support\Str::slug($name),
            'description'  => $this->faker->sentence(10),
            'price'        => $this->faker->randomFloat(2, 5, 50),
            'image_url'    => 'https://loremflickr.com/640/480/cuisine',
            'is_available' => true,
        ];
    }
}
