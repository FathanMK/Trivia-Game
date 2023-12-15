<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Avatar;

class AvatarPriceController extends Controller
{
    public function getFreeAvatars()
    {
        try {
            $avatars = Avatar::where("price", 0)->get();
            return response()->json([
                "code" => 200,
                "data" => $avatars,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "code" => 500,
                "message" => $e->getMessage(),
            ]);
        }
    }
    public function getPaidAvatars()
    {
        try {
            $avatars = Avatar::where("price", ">", 0)->get();
            return response()->json([
                "code" => 200,
                "data" => $avatars,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "code" => 500,
                "message" => $e->getMessage(),
            ]);
        }
    }
}
