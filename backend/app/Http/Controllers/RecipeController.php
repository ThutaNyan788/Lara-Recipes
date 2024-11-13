<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class RecipeController extends Controller
{
    public function index()
    {


        try {
            return Recipe::filter(request(['category']))
            ->latest()
            ->paginate();
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Internal Server Error',
                'error' => $e->getMessage(),
                "status" => 500
            ], 500);
        }
    }


    public function store()
    {


        try {

            $validator = Validator::make(request()->all(),[
                "title"=>"required",
                "description"=>"required",
                "photo"=>"required",
                "category_id"=>["required",Rule::exists('categories','id')],
            ]);


            if($validator->fails()){
                $flatteredErrors = collect($validator->errors())->flatMap(function($e,$field){
                    return [$field=>$e[0]];
                });

                return response()->json([
                    'message' => 'Validation Error',
                    'error' => $flatteredErrors,
                    "status" => 400
                ], 400);
            }


            $recipe = Recipe::create([
                "title"=>request("title"),
                "description"=>request("description"),
                "photo"=>request("photo"),
                "category_id"=>request("category_id"),
            ]);


            return response()->json([
                'message' => 'recipe created',
                'recipe' => $recipe,
                "status" => 201
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Internal Server Error',
                'error' => $e->getMessage(),
                "status" => 500
            ], 500);
        }
    }




    public function show($id)
    {
        try {
            $recipe = Recipe::find($id);
            if (!$recipe) {
                return response()->json([
                    'message' => 'recipe not found',
                    'status' => 404
                ], 404);
            }
            return $recipe;

        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }


    public function update($id){
        try {

            $validator = Validator::make(request()->all(),[
                "title"=>"required",
                "description"=>"required",
                "photo"=>"required",
                "category_id"=>["required",Rule::exists('categories','id')],
            ]);


            if($validator->fails()){
                $flatteredErrors = collect($validator->errors())->flatMap(function($e,$field){
                    return [$field=>$e[0]];
                });

                return response()->json([
                    'message' => 'Validation Error',
                    'error' => $flatteredErrors,
                    "status" => 400
                ], 400);
            }

            $getRecipe = Recipe::find($id);
            if(!$getRecipe){
                return response()->json([
                    'message' => 'recipe not found',
                    'status' => 404
                ], 404);
            }


            $recipe = Recipe::where("id",$id)->update([
                "title"=>request("title"),
                "description"=>request("description"),
                "photo"=>request("photo"),
                "category_id"=>request("category_id"),
            ]);


            return response()->json([
                'message' => 'recipe updated',
                "status" => 201
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Internal Server Error',
                'error' => $e->getMessage(),
                "status" => 500
            ], 500);
        }
    }


    public function destroy($id){


        try {
            $recipe = Recipe::find($id);
            if (!$recipe) {
                return response()->json([
                    'message' => 'recipe not found',
                    'status' => 404
                ], 404);
            }
            $recipe->delete();
            return response()->json([
                'message' => 'recipe deleted',
                'status' => 200
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }


    public function upload(){
        try {

            //validation
            $validator = Validator::make(request()->all(), [
                "photo" => ['required', 'image'],
            ]);

            if ($validator->fails()) {
                $flatteredErrors = collect($validator->errors())->flatMap(function ($e, $field) {
                    return [$field => $e[0]];
                });
                return response()->json([
                    'errors' => $flatteredErrors,
                    'status' => 400
                ], 400);
            }
            $path = "/storage/".request('photo')->store('/recipes');


            return [
                'path' => $path,
                'status' => 200
            ];
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }
}
