<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class MenuApiTest extends TestCase
{
    #[Test]
    public function it_returns_the_active_menu_catalog()
    {
        $this->seed(\Database\Seeders\MenuSeeder::class);

        $response = $this->getJson('/api/menu');

        $response->assertStatus(200)
            ->assertJsonStructure([
                '*' => [
                    'id',
                    'name',
                    'products' => [
                        '*' => ['id', 'name', 'option_groups']
                    ]
                ]
            ]);
    }
}
