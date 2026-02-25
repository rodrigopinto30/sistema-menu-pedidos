<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\OrderController;

Route::get('/menu', [MenuController::class, 'index']);

Route::post('/orders', [OrderController::class, 'store']);
