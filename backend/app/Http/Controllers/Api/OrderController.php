<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

    public function index()
    {
        return Order::with(['items.product'])->latest()->get();
    }

    public function store(StoreOrderRequest $request)
    {
        return DB::transaction(function () use ($request) {

            $order = Order::create([
                'customer_name'    => $request->customer_name,
                'customer_phone'   => $request->customer_phone,
                'customer_address' => $request->customer_address,
                'status'           => 'pending',
                'total_price'      => 0,
            ]);

            $totalPrice = 0;


            foreach ($request->items as $item) {
                $product = Product::find($item['product_id']);
                $subtotal = $product->price * $item['quantity'];

                $order->items()->create([
                    'product_id'    => $product->id,
                    'quantity'      => $item['quantity'],
                    'price_at_time' => $product->price,
                ]);

                $totalPrice += $subtotal;
            }

            $order->update(['total_price' => $totalPrice]);

            return response()->json([
                'message' => 'Order created successfully',
                'order'   => $order->load('items')
            ], 201);
        });
    }
}
