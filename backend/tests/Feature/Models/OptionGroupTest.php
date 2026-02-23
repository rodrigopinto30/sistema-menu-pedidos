<?php

namespace Tests\Feature\Models;

use App\Models\OptionGroup;
use App\Models\OptionItem;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class OptionGroupTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function test_it_belongs_to_a_product()
    {
        $product = Product::factory()->create();
        $group = OptionGroup::factory()->create(['product_id' => $product->id]);

        $this->assertInstanceOf(Product::class, $group->product);
    }

    #[Test]
    public function test_it_has_many_option_items()
    {
        $group = OptionGroup::factory()->create();
        OptionItem::factory()->count(2)->create(['option_group_id' => $group->id]);

        $this->assertCount(2, $group->optionItems);
    }
}
