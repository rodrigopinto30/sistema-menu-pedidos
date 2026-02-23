<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        $burgers = \App\Models\Category::create([
            'name' => 'Burgers',
            'slug' => 'burgers',
            'is_active' => true,
        ]);

        $classic = \App\Models\Product::create([
            'category_id' => $burgers->id,
            'name' => 'Classic Burger',
            'slug' => 'classic-burger',
            'description' => 'Beef, lettuce, tomato, and our secret sauce.',
            'price' => 12.50,
            'is_available' => true,
        ]);

        $sizeGroup = \App\Models\OptionGroup::create([
            'product_id' => $classic->id,
            'name' => 'Select Size',
            'is_required' => true,
            'max_selectable' => 1,
        ]);

        $extrasGroup = \App\Models\OptionGroup::create([
            'product_id' => $classic->id,
            'name' => 'Extra Toppings',
            'is_required' => false,
            'max_selectable' => 3,
        ]);

        \App\Models\OptionItem::create(['option_group_id' => $sizeGroup->id, 'name' => 'Regular', 'additional_price' => 0]);
        \App\Models\OptionItem::create(['option_group_id' => $sizeGroup->id, 'name' => 'Double', 'additional_price' => 5.00]);

        \App\Models\OptionItem::create(['option_group_id' => $extrasGroup->id, 'name' => 'Bacon', 'additional_price' => 1.50]);
        \App\Models\OptionItem::create(['option_group_id' => $extrasGroup->id, 'name' => 'Cheddar', 'additional_price' => 1.00]);
    }
}
