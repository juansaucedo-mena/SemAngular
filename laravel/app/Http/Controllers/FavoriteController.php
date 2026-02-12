<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $ids = $request->user()->favoriteModules()->pluck('modules.id');

        return response()->json($ids);
    }

    public function store(Request $request, Module $module): JsonResponse
    {
        $request->user()->favoriteModules()->syncWithoutDetaching([$module->id]);

        return response()->json(['message' => 'Favorito agregado'], 201);
    }

    public function destroy(Request $request, Module $module): JsonResponse
    {
        $request->user()->favoriteModules()->detach($module->id);

        return response()->json(['message' => 'Favorito eliminado']);
    }
}
