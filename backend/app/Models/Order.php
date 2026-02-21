<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['customer_name', 'table_number', 'status', 'payment_method', 'total_amount', 'notes'];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}