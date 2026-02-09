<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StudentDashboardController extends Controller
{
    public function myCourses(Request $request)
    {
        $user = $request->user();

        $courses = $user->enrolledCourses()
            ->with('instructor:id,name')
            ->latest('course_user.enrolled_at')
            ->paginate(6);

        return response()->json($courses);
    }


    public function show(Request $request, $courseId)
    {
        $user = $request->user();

        $course = $user->enrolledCourses()
            ->where('courses.id', $courseId)
            ->with([
                'modules:id,course_id,title',
                'modules.lessons:id,module_id,title,content'
            ])
            ->firstOrFail();

        return response()->json($course);
    }

}
