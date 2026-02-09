<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\EnrollmentController;
use App\Http\Controllers\Api\InstructorCourseController;
use App\Http\Controllers\Api\PublicCourseController;
use App\Http\Controllers\Api\StudentDashboardController;
use App\Http\Controllers\Instructor\LessonController;
use App\Http\Controllers\Instructor\ModuleController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/me', [AuthController::class, 'me']);

Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{slug}', [CourseController::class, 'show']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/courses/{course}/enroll', [EnrollmentController::class, 'enroll']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/student/courses', [StudentDashboardController::class, 'myCourses']);
    Route::get('/student/courses/{courseId}', [StudentDashboardController::class, 'show']);
});


Route::middleware('auth:sanctum')->prefix('instructor')->group(function () {
    Route::get('/dashboard', [InstructorCourseController::class, 'dashboard']);
    Route::get('/courses', [InstructorCourseController::class, 'index']);
    Route::post('/courses', [InstructorCourseController::class, 'store']);
    Route::put('/courses/{course}', [InstructorCourseController::class, 'update']);
    Route::get('/courses/{course}', [InstructorCourseController::class, 'show']);
    Route::delete('/courses/{course}', [InstructorCourseController::class, 'destroy']);
    Route::patch('/courses/{course}/publish', [InstructorCourseController::class, 'togglePublish']);

    Route::get('courses/{course}/modules', [ModuleController::class, 'index']);
    Route::post('courses/{course}/modules', [ModuleController::class, 'store']);
    Route::put('modules/{module}', [ModuleController::class, 'update']);
    Route::delete('modules/{module}', [ModuleController::class, 'destroy']);
    Route::post('modules/reorder', [ModuleController::class, 'reorder']);
    
    Route::post('modules/{module}/lessons', [LessonController::class, 'store']);
    Route::put('lessons/{lesson}', [LessonController::class, 'update']);
    Route::delete('lessons/{lesson}', [LessonController::class, 'destroy']);
    Route::post('lessons/reorder', [LessonController::class, 'reorder']);
});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
