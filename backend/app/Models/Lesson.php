<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $fillable = [
        'title',
        'content',
        'sort_order',
        'is_published'
    ];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }
}
