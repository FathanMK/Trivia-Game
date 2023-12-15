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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            // $table->unsignedBigInteger('answer_id');
            $table->string('question');
            $table->string('answer');
            $table->string('wrong_answer_1');
            $table->string('wrong_answer_2');
            $table->string('wrong_answer_3');
            $table->timestamps();

            // $table->foreign('answer_id')->references('id')->on('answers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
