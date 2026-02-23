<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->decimal('price', 8, 2);
            $table->boolean('is_available')->default(true);
            $table->string('image_url')->nullable();
            $table->timestamps();
        });

        // Option Groups (For Variants like "Size", "Extras")
        Schema::create('option_groups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->boolean('is_required')->default(false);
            $table->integer('max_selectable')->default(1);
            $table->timestamps();
        });

        Schema::create('option_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('option_group_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->decimal('additional_price', 8, 2)->default(0);
            $table->timestamps();
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name');
            $table->string('table_number')->nullable();
            $table->string('customer_phone');
            $table->text('customer_address');
            $table->enum('status', ['pending', 'preparing', 'ready', 'delivered', 'cancelled'])->default('pending');
            $table->enum('payment_method', ['cash', 'card', 'online'])->default('cash');
            $table->decimal('total_price', 10, 2)->default(0);
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained();
            $table->integer('quantity');
            $table->decimal('price_at_time', 10, 2);
            $table->json('options_snapshot')->nullable();
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catalog_and_orders_tables');
    }
};
