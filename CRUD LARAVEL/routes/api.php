<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\AvatarController;
use App\Http\Controllers\api\QuestionController;
use App\Http\Controllers\api\AnswerController;
use App\Http\Controllers\api\TriviaUserController;
use App\Http\Controllers\api\UserAvatarController;
use App\Http\Controllers\api\AvatarPriceController;
use App\Http\Controllers\api\LoginController;
use App\Http\Controllers\api\LogoutController;

Route::middleware("auth:sanctum")->get("/users", function (Request $request) {
    return $request->user();
});

// AVATARS
Route::apiResource("avatar", AvatarController::class);
// Route::get('/avatars', [AvatarController::class, 'findAll']);
// Route::get('/avatar/{id}', [AvatarController::class, 'getAvatarById']);
// Route::post('/avatar', [AvatarController::class, 'store']);

// USERS
Route::apiResource("user", UserController::class);
Route::post("/checkUser", [UserCheckController::class, "checkUser"]);
// Route::get('/users', [UserController::class, 'findAll']);
// Route::get('/user/{id}', [UserController::class, 'getUserById']);
// Route::post('/user', [UserController::class, 'store']);

// QUESTIONS
Route::apiResource("question", QuestionController::class);

// ANSWERS
Route::apiResource("answer", AnswerController::class);

// TRIVIA USERS
// Route::apiResource(
//     "trivia-user",
//     \App\Http\Controllers\api\TriviaUserController::class
// );
// USER AVATAR
Route::apiResource("user-avatar", UserAvatarController::class);

// AVATAR PRICE
Route::get("avatar-free", [AvatarPriceController::class, "getFreeAvatars"]);
Route::get("avatar-paid", [AvatarPriceController::class, "getPaidAvatars"]);

// LOGIN
Route::post("login", LoginController::class);
Route::middleware("auth:api")->get("/check", function (Request $request) {
    return $request->user();
});
Route::post("/logout", LogoutController::class);
