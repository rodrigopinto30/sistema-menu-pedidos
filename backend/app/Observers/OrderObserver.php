<?php

namespace App\Observers;

use App\Models\Order;
use App\Models\OrderHistory;

class OrderObserver
{
    /**
     * Handle the Order "created" event.
     */
    public function created(Order $order): void
    {
        OrderHistory::create([
            'order_id' => $order->id,
            'status'   => $order->status,
            'comment'  => 'Order has been placed successfully.',
            'changed_at' => now(),
        ]);
    }

    /**
     * Handle the Order "updated" event.
     */
    public function updated(Order $order): void
    {
        if ($order->isDirty('status')) {
            OrderHistory::create([
                'order_id' => $order->id,
                'status'   => $order->status,
                'comment'  => $this->getStatusComment($order->status),
                'changed_at' => now(),
            ]);
        }
    }

    private function getStatusComment(string $status): string
    {
        return match ($status) {
            'preparing' => 'The kitchen is preparing your food.',
            'shipped'   => 'Your order is on its way!',
            'delivered' => 'Order delivered. Enjoy your meal!',
            default     => 'Order status updated to ' . $status,
        };
    }

    /**
     * Handle the Order "deleted" event.
     */
    public function deleted(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "restored" event.
     */
    public function restored(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "force deleted" event.
     */
    public function forceDeleted(Order $order): void
    {
        //
    }
}
