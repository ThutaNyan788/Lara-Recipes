<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// authentication

// register
Route::post('/register', [RegisterController::class, 'store']);
Route::post("/login", [LoginController::class, 'store']);




// get all categories
Route::get("/categories", [CategoryController::class,"index"]);

// get all recipes
Route::get("/recipes", [RecipeController::class,"index"]);
//get single recipe
Route::get('/recipes/{recipe}', [RecipeController::class, 'show']);

//create recipe
Route::post('/recipes', [RecipeController::class, 'store']);


// delete recipe
Route::delete('/recipes/{recipe}', [RecipeController::class, 'destroy']);

//update recipe
Route::patch('/recipes/{recipe}', [RecipeController::class, 'update']);
// upload photo
Route::post('/recipes/upload', [RecipeController::class, 'upload']);



Route::get('/user', function (Request $request) {
     return $request->user();
})->middleware('auth:sanctum');
