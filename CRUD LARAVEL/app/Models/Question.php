<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    protected $fillable = [
        'question',
        'answer',
        'wrong_answer_1',
        'wrong_answer_2',
        'wrong_answer_3',
    ];

    // public function answer()
    // {
    //     return $this->belongsTo(Answer::class);
    //     // return $this->hasOne(Answer::class);
    // }
}
