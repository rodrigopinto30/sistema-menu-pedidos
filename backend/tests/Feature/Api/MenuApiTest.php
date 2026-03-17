<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class MenuApiTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_returns_the_active_menu_catalog()
    {
        $this->seed(\Database\Seeders\MenuSeeder::class);

        $user = \App\Models\User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/menu');

        $response->assertStatus(200);
    }
}
