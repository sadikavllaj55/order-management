<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\ProductType;

class ProductTypeController extends Controller
{
    public function index()
    {
        return response()->json(ProductType::all());
    }
}
