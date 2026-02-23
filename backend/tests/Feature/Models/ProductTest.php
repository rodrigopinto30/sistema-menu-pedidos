<?php

namespace Tests\Feature\Models;

use App\Models\Product;
use App\Models\Category;
use App\Models\OptionGroup;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function test_it_belongs_to_a_category()
    {
        $category = Category::factory()->create();
        $product = Product::factory()->create(['category_id' => $category->id]);

        $this->assertInstanceOf(Category::class, $product->category);
        $this->assertEquals($category->id, $product->category_id);
    }

    #[Test]
    public function test_it_has_many_option_groups()
    {
        $product = Product::factory()->create();
        OptionGroup::factory()->count(3)->create(['product_id' => $product->id]);

        $this->assertCount(3, $product->optionGroups);
        $this->assertInstanceOf(OptionGroup::class, $product->optionGroups->first());
    }
}
