<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class PublicCourseController extends Controller
{
    public function index()
    {
        return Course::where('is_published', true)
            ->select('id','title','slug','price','level')
            ->get();
    }

    public function show($slug)
    {
        return Course::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();
    }
}
