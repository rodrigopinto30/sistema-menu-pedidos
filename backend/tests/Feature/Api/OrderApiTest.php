<?php

namespace Tests\Feature\Api;

use App\Models\Product;
use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class OrderApiTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function test_it_can_create_an_order_successfully()
    {
        $user = \App\Models\User::factory()->create();

        $productA = Product::factory()->create(['price' => 10.00]);
        $productB = Product::factory()->create(['price' => 20.00]);

        $payload = [
            'customer_name'    => 'John Doe',
            'customer_phone'   => '123456789',
            'customer_address' => 'Test Street 123',
            'items' => [
                [
                    'product_id' => $productA->id,
                    'quantity'   => 2,
                ],
                [
                    'product_id' => $productB->id,
                    'quantity'   => 1,
                ]
            ]
        ];

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/orders', $payload);
        $response->assertStatus(201)
            ->assertJsonPath('order.total_price', 40);

        $this->assertDatabaseHas('orders', [
            'customer_name' => 'John Doe',
            'total_price'   => 40
        ]);

        $this->assertDatabaseCount('order_items', 2);
    }

    #[Test]
    public function it_fails_if_required_fields_are_missing()
    {
        $user = \App\Models\User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/orders', []);

        $response->assertStatus(422);
    }
}
