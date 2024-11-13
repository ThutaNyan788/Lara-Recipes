<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function store(Request $request){
        try {
            $validated = Validator::make($request->all(),[
                'email' => 'required|email|max:255',
                'password' => 'required|min:4',
            ]);


            if($validated->fails()){
                $validated_errors = collect($validated->errors())->flatMap(function($error,$field){
                    return [$field => $error[0]];
                });
                return response()->json($validated_errors , 400);
            }


            $hasEmail = User::where('email',$request->email)->first();

            if(!$hasEmail){
                return response()->json([
                    "message"=>"Email does not exit!!",
                    "status"=>400
                ],400);
            }


            $isCorrectPassword = Hash::check($request->password,$hasEmail->password);

            if(!$isCorrectPassword){
                return response()->json([
                    "message"=>"Password is incorrect!!",
                    "status"=>400
                ],400);
            }


            $token = $hasEmail->createToken('auth_token')->plainTextToken;

            return response()->json([
                "message"=>"success",
                "status"=>200,
                "user"=>$hasEmail,
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
