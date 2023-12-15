<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Avatar;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\Rule;

class UserViewController extends Controller
{
    public function index(): View
    {
        $users = User::orderBy("id")->get();
        $avatars = Avatar::orderBy("id")->get();
        return view("pages.user", compact("users", "avatars"));
    }

    public function store(Request $request): RedirectResponse
    {
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
            "password" => ["confirmed", Rules\Password::defaults()],
            "avatar" => ["required"],
            "current_avatar" => ["required", "numeric"],
            "diamonds" => ["required", "numeric"],
            "total_points" => ["required", "numeric"],
        ]);

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "username" => $request->username,
            "password" => Hash::make($request->password),
            "avatar_id" => $request->avatar_id,
            "diamonds" => $request->diamonds,
            "total_points" => $request->total_points,
        ]);

        $user->avatar()->sync($request->avatar);

        event(new Registered($user));

        return redirect()
            ->back()
            ->with("success", "User created successfully");
    }

    public function show($id): View
    {
        $user = User::findOrFail($id);
        return view("pages.user", compact("user"));
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $user = User::findOrFail($id);

        $rules = [
            "name" => ["required", "string", "max:255"],
            "email" => [
                "required",
                "string",
                "lowercase",
                "email",
                "max:255",
                Rule::unique(User::class)->ignore($id, "id"),
            ],
            "avatar_id" => ["required", "numeric"],
            "diamonds" => ["required", "numeric"],
            "total_points" => ["required", "numeric"],
        ];

        if ($request->password === "") {
            // Jika password tidak diisi dalam request, jangan ubah password yang ada di database
            $request->merge(["password" => $user->password]);
        } elseif ($request->has("password")) {
            // Jika password diisi dalam request, gunakan password yang diberikan
            $request->merge(["password" => $request->password]);
        }
        // Cek apakah bidang password tidak kosong sebelum menambahkan aturan validasi
        if ($request->has("password")) {
            $rules["password"] = [
                "nullable",
                "confirmed",
                Rules\Password::defaults(),
            ];
        }

        $this->validate($request, $rules);

        $user->update($request->all());

        return redirect()
            ->back()
            ->with("success", "User updated successfully");
    }

    public function destroy($id): RedirectResponse
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()
            ->back()
            ->with("success", "User deleted successfully");
    }
}
