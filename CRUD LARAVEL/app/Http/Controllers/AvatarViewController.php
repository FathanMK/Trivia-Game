<?php

namespace App\Http\Controllers;

use App\Models\Avatar;
use App\Models\User;
use App\Models\UserAvatar;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\CloudinaryStorage;
use DateTime;

class AvatarViewController extends Controller
{
    public function index(): View
    {
        $avatars = Avatar::orderBy("id")->get();
        $users = User::orderBy("id")->get();
        $userAvatars = UserAvatar::orderBy("id")->get();

        $currentDate = new DateTime();
        $currentMonth = $currentDate->format("m"); // Ambil bulan saat ini
        $currentYear = $currentDate->format("Y"); // Ambil tahun saat ini

        // Inisialisasi total keuntungan bulan November dan total keuntungan per tahun
        $totalKeuntunganBulanIni = 0;
        $totalKeuntunganTahunIni = 0;

        foreach ($userAvatars as $userAvatar) {
            $avatarId = $userAvatar->avatar_id;
            foreach ($avatars as $avatar) {
                if ($avatar->id === $avatarId) {
                    $createdAt = new DateTime($userAvatar->created_at);
                    $avatarMonth = $createdAt->format("m");
                    $avatarYear = $createdAt->format("Y");

                    if (
                        $avatarMonth === $currentMonth &&
                        $avatarYear === $currentYear
                    ) {
                        $totalKeuntunganBulanIni += $avatar->price;
                    }
                    if ($avatarYear === $currentYear) {
                        $totalKeuntunganTahunIni += $avatar->price;
                    }
                    break;
                }
            }
        }
        return view(
            "pages.avatar",
            compact(
                "avatars",
                "totalKeuntunganBulanIni",
                "totalKeuntunganTahunIni"
            )
        );
    }

    public function store(Request $request): RedirectResponse
    {
        $this->validate($request, [
            "image_src" => "required|image|mimes:jpeg,jpg,png|max:2048",
            "price" => "required|numeric",
        ]);

        $image = $request->file("image_src");
        $result = CloudinaryStorage::upload(
            $image->getRealPath(),
            $image->getClientOriginalName()
        );

        Avatar::create([
            "image_src" => $result,
            "price" => $request->price,
        ]);

        return redirect()
            ->back()
            ->with("success", "Avatar created successfully");
    }

    public function show($id): View
    {
        $avatar = Avatar::findOrFail($id);
        return view("pages.avatar", compact("avatar"));
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $avatar = Avatar::findOrFail($id);
        $this->validate($request, [
            "image_src" => "image|mimes:jpeg,jpg,png|max:2048",
            "price" => "required|numeric",
        ]);

        if ($request->hasFile("image_src")) {
            $image = $request->file("image_src");
            $result = CloudinaryStorage::upload(
                $image->getRealPath(),
                $image->getClientOriginalName()
            );
        } else {
            $result = $avatar->image_src;
        }

        $avatar->update([
            "image_src" => $result,
            "price" => $request->price,
        ]);

        return redirect()
            ->back()
            ->with("success", "Avatar updated successfully");
    }

    public function destroy($id): RedirectResponse
    {
        $avatar = Avatar::findOrFail($id);
        $avatar->delete();

        return redirect()
            ->back()
            ->with("success", "Avatar deleted successfully");
    }
}
