<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
   use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'price',
        'level',
        'instructor_id',
        'is_published'
    ];

    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    public function students()
{
    return $this->belongsToMany(User::class)
        ->withTimestamps()
        ->withPivot('enrolled_at');
}

public function is_enrolled($userId)
{
    return $this->students()->where('user_id', $userId)->exists();
}

// public function enrollments()
// {
//     return $this->hasMany(Enrollment::class);
// }

public function modules()
{
    return $this->hasMany(Module::class)->orderBy('sort_order');
}



}
