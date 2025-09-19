<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'product_type_id',
        'name',
        'description',
        'price',
        'stock',
        'sku',
        'status',
        'created_by',
        'updated_by',
        'deleted_by'
    ];

    // Relationships
    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
