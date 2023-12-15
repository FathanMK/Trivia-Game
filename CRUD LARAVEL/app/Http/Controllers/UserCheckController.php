<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserCheckController extends Controller
{
    //CHECK IF USER EXIST
    public function checkUser(Request $request)
    {
        try {
            $email = $request->email;
            $user = User::where("email", $email)->first();

            if ($user) {
                return response()->json([
                    "message" => "User Exist",
                    "isUserExist" => true,
                    "data" => $user,
                ]);
            } else {
                return response()->json([
                    "message" => "User Didn't Exist",
                    "isUserExist" => false,
                ]);
            }
        } catch (QueryException $e) {
            return response()->json([
                "code" => 500,
                "message" => $e->getMessage(),
            ]);
        }
    }
}
