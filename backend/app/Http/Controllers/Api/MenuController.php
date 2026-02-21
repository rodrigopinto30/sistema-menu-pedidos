<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class MenuController extends Controller
{
    public function index(): JsonResponse
    {
        $menu = Category::where('is_active', true)
            ->with(['products' => function ($query) {
                $query->where('is_available', true)->with('optionGroups.optionItems');
            }])
            ->get();

        return response()->json($menu);
    }
}
