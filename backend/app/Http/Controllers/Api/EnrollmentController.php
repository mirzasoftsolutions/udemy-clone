<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    public function enroll(Request $request, Course $course)
    {
        $user = $request->user();

        if ($user->enrolledCourses()->where('course_id', $course->id)->exists()) {
            return response()->json([
                'message' => 'Already enrolled'
            ], 409);
        }

        $user->enrolledCourses()->attach($course->id, [
            'enrolled_at' => now(),
        ]);

        return response()->json([
            'message' => 'Enrolled successfully'
        ]);
    }
}
