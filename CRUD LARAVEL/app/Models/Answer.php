<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;
    protected $fillable = [
        // 'question_id',
        'answer',
        'wrong_answer_1',
        'wrong_answer_2',
        'wrong_answer_3',
    ];

    public function question()
    {
        // return $this->belongsTo(Question::class);
        return $this->hasOne(Question::class);
    }
}
