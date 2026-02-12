<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\JsonResponse;

class ModuleController extends Controller
{
    public function index(): JsonResponse
    {
        $modules = Module::whereNull('parent_module_id')
            ->where('active', true)
            ->orderBy('order')
            ->with('children')
            ->get();

        return response()->json($modules);
    }
}
