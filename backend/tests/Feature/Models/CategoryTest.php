<?php

namespace Tests\Feature\Models;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use App\Models\Category;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function test_it_can_create_a_category()
    {
        $category = Category::create([
            'name' => 'Pizza',
            'slug' => 'pizza',
        ]);

        $this->assertDatabaseHas('categories', [
            'name' => 'Pizza'
        ]);
    }
}
