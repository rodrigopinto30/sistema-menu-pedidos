<?php

namespace Tests\Feature\Models;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function test_it_can_have_multiple_items()
    {
        $order = Order::factory()->create();
        OrderItem::factory()->count(2)->create(['order_id' => $order->id]);

        $this->assertCount(2, $order->items);
        $this->assertInstanceOf(OrderItem::class, $order->items->first());
    }
}
