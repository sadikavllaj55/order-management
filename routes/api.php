<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\OrderController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\ProductTypeController;

/*
|--------------------------------------------------------------------------
| Public routes
|--------------------------------------------------------------------------
*/
Route::post('login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected routes (require token)
|--------------------------------------------------------------------------
*/

//Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);

    Route::apiResource('products', ProductController::class);
    Route::apiResource('customers', CustomerController::class);
    Route::apiResource('orders', OrderController::class);
    Route::apiResource('product-types', ProductTypeController::class);
//});

Route::get('/product-statuses', function() {
    return response()->json([
        'success' => true,
        'data' => config('product.statuses')
    ]);
});

Route::get('/order-statuses', function() {
    return response()->json([
        'success' => true,
        'data' => config('order.statuses')
    ]);
});
