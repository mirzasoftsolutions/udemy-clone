<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $courses = Course::with('instructor:id,name')
            ->where('is_published', true)
            ->latest()
            ->paginate(6);

        return response()->json($courses);
    }

    public function show(string $slug)
    {
        $course = Course::with('instructor:id,name')
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

            // Check if the authenticated user is enrolled in the course
            $user = auth('sanctum')->user();    
            
            if ($user) {
                $course->is_enrolled = $course->is_enrolled($user->id);
            } else {
                $course->is_enrolled = false;
            }

        return response()->json($course);
    }

}
