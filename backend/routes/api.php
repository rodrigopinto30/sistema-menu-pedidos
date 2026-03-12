<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;

Route::get('/menu', [MenuController::class, 'index']);

Route::get('/orders', [OrderController::class, 'index']);
Route::post('/orders', [OrderController::class, 'store']);
Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus']);

Route::apiResource('products', ProductController::class);
Route::patch('/products/{product}/toggle', [ProductController::class, 'toggleAvailability']);
