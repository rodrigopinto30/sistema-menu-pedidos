<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['category_id', 'name', 'slug', 'description', 'price', 'image', 'is_available'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function optionGroups()
    {
        return $this->hasMany(OptionGroup::class);
    }
}
