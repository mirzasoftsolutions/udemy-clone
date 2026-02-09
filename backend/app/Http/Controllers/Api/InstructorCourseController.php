<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class InstructorCourseController extends Controller
{
    public function dashboard(Request $request)
    {
        $user = $request->user();

        abort_if($user->role !== 'instructor', 403);

        $totalCourses = Course::where('instructor_id', $user->id)->count();
        $publishedCourses = Course::where('instructor_id', $user->id)
            ->where('is_published', true)
            ->count();
        $draftCourses = Course::where('instructor_id', $user->id)
            ->where('is_published', false)
            ->count();
        $totalStudents = Course::where('instructor_id', $user->id)
            ->get()
            ->sum(function ($course) {
                return $course->students()->count();
            });

        return response()->json([
            'total_courses' => $totalCourses,
            'published_courses' => $publishedCourses,
            'draft_courses' => $draftCourses,
            'total_students' => $totalStudents,
        ]);
    }
    public function index(Request $request)
    {
        $user = $request->user();

        abort_if($user->role !== 'instructor', 403);

        $courses = Course::where('instructor_id', $user->id)
            ->latest()
            ->paginate(6);

        return response()->json($courses);
    }

        public function store(Request $request)
    {
        $user = $request->user();
        abort_if($user->role !== 'instructor', 403);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'level' => 'required|in:beginner,intermediate,advanced',
        ]);

        $course = Course::create([
            ...$data,
            'slug' => Str::slug($data['title']),
            'instructor_id' => $user->id,
            'is_published' => false,
        ]);

        return response()->json($course, 201);
    }
    public function update(Request $request, Course $course)
    {
        $user = $request->user();

        abort_if(
            $user->role !== 'instructor' || $course->instructor_id !== $user->id,
            403
        );

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'level' => 'required|in:beginner,intermediate,advanced',
            
        ]);

        $course->update([
            ...$data,
            'slug' => Str::slug($data['title']),
            'is_published' => $data['is_published'] ?? $course->is_published, // Preserve current publish status
        ]);

        return response()->json($course);
    }
    public function destroy(Request $request, Course $course)
    {
        $user = $request->user();

        abort_if(
            $user->role !== 'instructor' || $course->instructor_id !== $user->id,
            403
        );

        $course->delete();

        return response()->json([
            'message' => 'Course deleted'
        ]);
    }
    public function togglePublish(Request $request, Course $course)
    {
        $user = $request->user();

        abort_if(
            $user->role !== 'instructor' || $course->instructor_id !== $user->id,
            403
        );

        $course->update([
            'is_published' => ! $course->is_published
        ]);

        return response()->json([
            'is_published' => $course->is_published
        ]);
    }


    public function show(Request $request, Course $course)
    {
        $user = $request->user();

        abort_if(
            $user->role !== 'instructor' || $course->instructor_id !== $user->id,
            403
        );

        return response()->json($course);
    }
}


