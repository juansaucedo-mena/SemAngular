<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ModuleController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/modules', [ModuleController::class, 'index']);

    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites/{module}', [FavoriteController::class, 'store']);
    Route::delete('/favorites/{module}', [FavoriteController::class, 'destroy']);
});
