<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;
    protected $fillable = [
        // 'name',
        'avatar_id',
        'email',
        'username',
        'diamonds',
        'total_points',
    ];
    public function avatar()
    {
        return $this->belongsTo(Avatar::class);
    }
}
