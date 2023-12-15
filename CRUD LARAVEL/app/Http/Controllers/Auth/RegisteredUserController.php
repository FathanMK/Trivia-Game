<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Avatar;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\View\View;
use Illuminate\Support\Str;
use Mail;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): View
    {
        $avatars = Avatar::orderBy("id")->get();
        return view("pages.auth.register", compact("avatars"));
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
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
            "password" => ["required", "confirmed", Rules\Password::defaults()],
            "avatar_choices" => ["required"],
            "current_avatar" => ["required", "numeric"],
            "admin_code" => ["required", "string"],
        ]);

        if ($request->admin_code !== env("ADMIN_CODE")) {
            return back()->withErrors([
                "admin_code" => "Invalid admin code",
            ]);
        } /* else {
            $request->email_verified_at = now();
        }*/
        $token = Str::random(64);

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "username" => $request->username,
            "password" => Hash::make($request->password),
            "current_avatar" => $request->current_avatar,
            // "email_verified_at" => $request->email_verified_at,
            "remember_token" => $token,
        ]);

        $user->avatar()->attach($request->avatar_choices);

        Mail::send(
            "emails.emailVerificationEmail",
            ["token" => $token, "name" => $request->name],
            function ($message) use ($request) {
                $message->to($request->email);
                $message->subject("Verify Email");
            }
        );

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }

    public function verifyEmail($token)
    {
        $verifyUser = User::where("remember_token", $token)->first();
        $message = "Sorry your email cannot be identified.";

        if ($verifyUser) {
            if ($verifyUser->email_verified_at == null) {
                $verifyUser->email_verified_at = now();
                $verifyUser->remember_token = null;
                $verifyUser->save();
                $message = "Your e-mail is verified. You can now login.";
            } else {
                $message =
                    "Your e-mail is already verified. You can now login.";
            }
        }

        return redirect()
            ->route("login")
            ->with("message", $message);
    }
}
