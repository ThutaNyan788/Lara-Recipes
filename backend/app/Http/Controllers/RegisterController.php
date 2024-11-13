<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function store(Request $request){
        try {
            $validated = Validator::make($request->all(),[
                'name' => 'required|max:255',
                'email' => 'required|email|max:255|unique:users',
                'password' => 'required|min:4',
            ]);


            if($validated->fails()){
                $validated_errors = collect($validated->errors())->flatMap(function($error,$field){
                    return [$field => $error[0]];
                });
                return response()->json($validated_errors , 400);
            }


            $hasEmail = User::where('email',$request->email)->first();

            if($hasEmail){
                return response()->json([
                    "message"=>"Email already exists",
                    "status"=>400
                ],400);
            }


            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);


            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                "message"=>"success",
                "status"=>200,
                "user"=>$user,
                "token"=>$token
            ],200);
        } catch (Exception $e) {
            return response()->json([
                "message"=>"Internal Server Error!!",
                "status"=>500,
                "error"=>$e->getMessage()
            ],500);
        }

    }
}
