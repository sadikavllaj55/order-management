<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('welcome');
});



Route::get('/products', function () {
    return view('products.index');
});
Route::get('/products/create', function () {
    return view('products.create');
});
Route::get('/products/{id}', function () {
    return view('products.edit');
});


Route::get('/customers', function () {
    return view('customers.index');
});
Route::get('/customers/create', function () {
    return view('customers.create');
});
Route::get('/customers/{id}', function () {
    return view('customers.edit');
});


