<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('avatar_id');
            $table->string('email');
            $table->string('username');
            $table->integer('diamonds')->default(0);
            $table->bigInteger('total_points')->default(0);
            $table->timestamps();

            $table->foreign('avatar_id')->references('id')->on('avatars')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
