<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with('customer','items', 'items.product')->get();

        return response()->json([
            'success' => true,
            'data' => $orders
        ]);
    }


    public function store(OrderRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();

        $order = Order::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Order created successfully',
            'data' => $order
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load( 'items', 'items.product');

        return response()->json([
            'success' => true,
            'data' => $order
        ]);
    }


    public function update(OrderRequest $request, Order $order)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        $order->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Order updated successfully',
            'data' => $order
        ]);
    }

    public function destroy(Order $order)
    {
        $order->update(['deleted_by' => Auth::id()]);
        $order->delete();

        return response()->json([
            'success' => true,
            'message' => 'Order deleted successfully'
        ]);
    }
}
