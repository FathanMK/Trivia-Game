<?php

namespace App\Http\Controllers\api;

use App\Models\Avatar;
use App\Http\Controllers\Controller;
use App\Http\Controllers\CloudinaryStorage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AvatarController extends Controller
{
    public function index()
    {
        try {
            $avatars = Avatar::all();
            return response()->json([
                'code' => 200,
                'data' => $avatars
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'image_src' => 'required|image|mimes:jpeg,jpg,png|max:2048',
                'price' => 'required|numeric',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'code' => 400,
                    'message' => $validator->errors()
                ]);
            }

            $image = $request->file('image_src');
            $result = CloudinaryStorage::upload($image->getRealPath(), $image->getClientOriginalName());

            Avatar::create([
                'image_src' => $result,
                'price' => $request->price
            ]);

            return response()->json([
                'code' => 200,
                'message' => 'Avatar created successfully',
            ]);
        } catch (QueryException $e) {
            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function show($id)
    {
        try {
            $avatar = Avatar::find($id);
            return response()->json([
                'code' => 200,
                'data' => $avatar
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $avatar = Avatar::findOrFail($id);
            $validator = Validator::make($request->all(), [
                'image_src' => 'required|image|mimes:jpeg,jpg,png|max:2048',
                'price' => 'required|numeric',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'code' => 400,
                    'message' => $validator->errors()
                ]);
            }

            $image = $request->file('image_src');
            $result = CloudinaryStorage::upload($image->getRealPath(), $image->getClientOriginalName());

            $avatar->update([
                'image_src' => $result,
                'price' => $request->price
            ]);

            return response()->json([
                'code' => 200,
                'message' => 'Avatar updated successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function destroy(string $id)
    {
        try {
            Avatar::findOrFail($id)->delete();
            return response()->json([
                'code' => 200,
                'message' => 'Avatar deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }
}
