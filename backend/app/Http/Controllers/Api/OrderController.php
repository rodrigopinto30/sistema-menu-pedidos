<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return Order::with(['items.product', 'history'])->latest()->get();
    }

    public function show($id)
    {
        $order = Order::with(['items.product', 'history'])->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
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
                'order'   => $order->load(['items', 'history'])
            ], 201);
        });
    }

<<<<<<< Updated upstream
    public function updateStatus(Request $request, Order $order)
    {
        try {
            $validated = $request->validate([
                'status' => 'required|string'
            ]);

            $order->status = $validated['status'];
            $order->save();

            return response()->json([
                'message' => 'Status updated',
                'order' => $order->load('history')
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
=======

    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,preparing,shipped,delivered,cancelled'
        ]);

        $order->update(['status' => $validated['status']]);

        return response()->json([
            'message' => 'Order status updated successfully',
            'order' => $order
        ]);
>>>>>>> Stashed changes
    }
}
