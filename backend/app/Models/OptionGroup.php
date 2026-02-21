<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OptionGroup extends Model
{
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function optionItems()
    {
        return $this->hasMany(OptionItem::class);
    }
}