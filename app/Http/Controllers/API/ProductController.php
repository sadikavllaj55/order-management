<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Requests\ProductRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProductController extends Controller
{

    public function index()
    {
        $products = Product::with('productType')->get();
        return response()->json($products);
    }


    public function store(ProductRequest $request)
    {
        $data = $request->validated();

        // Add the authenticated user as creator
        $data['created_by'] = Auth::id();

        $product = Product::create($data);

        return response()->json([
            'message' => 'Product created successfully',
            'data' => $product
        ], 201);
    }

    public function show(Product $product)
    {
        return response()->json($product);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $data = $request->validated();
        $data['sku'] = $data['sku'] ?? Str::upper(Str::random(8));

        // Add the authenticated user as updater
        $data['updated_by'] = Auth::id();
        $product->update($data);

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => $product
        ]);
    }

    public function destroy(Product $product)
    {
        // Track who deleted it
        $product->update(['deleted_by' => Auth::id()]);
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ]);
    }
}
