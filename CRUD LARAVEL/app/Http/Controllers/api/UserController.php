<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Database\QueryException;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        try {
            $users = User::all();
            return response()->json([
                "code" => 200,
                "data" => $users,
            ]);
        } catch (QueryException $e) {
            return response()->json([
                "code" => 500,
                "message" => $e->getMessage(),
            ]);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                "name" => ["required", "string", "max:255"],
                "email" => [
                    "required",
                    "string",
                    "lowercase",
                    "email",
                    "max:255",
                    "unique:" . User::class,
                ],
                "username" => [
                    "required",
                    "string",
                    "max:255",
                    "unique:" . User::class,
                ],
                "password" => [
                    "sometimes",
                    "confirmed",
                    Rules\Password::defaults(),
                ],
                "avatar_choices" => ["sometimes", "array"],
                "current_avatar" => ["required", "numeric"],
                "diamonds" => ["numeric"],
                "total_points" => ["numeric"],
            ]);

            $user = User::create([
                "name" => $request->name,
                "email" => $request->email,
                "username" => $request->username,
                "current_avatar" => $request->current_avatar,
                "diamonds" => $request->diamonds,
                "total_points" => $request->total_points,
            ]);

            if ($request->has("avatar_choices")) {
                $user->avatar()->attach($request->avatar_choices);
            }

            return response()->json([
                "code" => 200,
                "message" => "User created successfully",
                "data" => $user,
            ]);
        } catch (QueryException $e) {
            return response()->json([
                "code" => 500,
                "message" => $e->getMessage(),
            ]);
        }
    }

    public function show($id)
    {
        try {
            $user = User::find($id);
            return response()->json([
                "code" => 200,
                "data" => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "code" => 500,
                "message" => $e->getMessage(),
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $validatedData = $request->validate([
                "name" => ["sometimes", "required", "string", "max:255"],
                "email" => [
                    "sometimes",
                    "required",
                    "string",
                    "lowercase",
                    "email",
                    "max:255",
                    Rule::unique("users")->ignore($user->id),
                ],
                "username" => [
                    "sometimes",
                    "required",
                    "string",
                    "max:255",
                    Rule::unique("users")->ignore($user->id),
                ],
                "avatar_choices" => ["sometimes", "array"],
                "current_avatar" => ["sometimes", "required", "numeric"],
                "diamonds" => ["sometimes", "numeric"],
                "total_points" => ["sometimes", "numeric"],
            ]);

            // Update only validated fields
            $user->fill($validatedData);
            $user->save();

            if ($request->has("avatar_choices")) {
                $user->avatar()->sync($request->avatar_choices);
            }

            return response()->json([
                "code" => 200,
                "message" => "User updated successfully",
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                "code" => 422,
                "message" => $e->errors(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "code" => 500,
                "message" => $e->getMessage(),
            ]);
        }
    }

    public function destroy($id)
    {
        try {
            User::findOrFail($id)->delete();
            return response()->json([
                "code" => 200,
                "message" => "User deleted successfully",
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "code" => 500,
                "message" => $e->getMessage(),
            ]);
        }
    }
}
