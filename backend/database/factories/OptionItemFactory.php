<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OptionItem>
 */
class OptionItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'option_group_id' => \App\Models\OptionGroup::factory(),
            'name' => $this->faker->word(),
            'additional_price' => 0,
        ];
    }
}
