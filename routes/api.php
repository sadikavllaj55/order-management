<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\OrderController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ProductController;


/*
|--------------------------------------------------------------------------
| Public routes
|--------------------------------------------------------------------------
*/

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
});
/*
|--------------------------------------------------------------------------
| Protected routes (require token)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('products', ProductController::class);
    Route::apiResource('customers', CustomerController::class);
    Route::apiResource('orders', OrderController::class);
});

//Route::middleware('auth:api')->group(function () {
    Route::apiResource('customers', CustomerController::class);
//});

//Route::middleware('auth:api')->group(function () {
    Route::apiResource('products', ProductController::class);
//});

//Route::middleware('auth:api')->group(function () {
    Route::apiResource('orders', OrderController::class);
//});
