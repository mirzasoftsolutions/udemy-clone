<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LessonController extends Controller
{
    public function store(Request $request, $moduleId)
    {
        $module = Module::findOrFail($moduleId);

        abort_if(
            $module->course->instructor_id !== Auth::id(),
            403
        );

        $lesson = $module->lessons()->create([
            'title' => $request->title,
            'content' => $request->content,
            'sort_order' => $module->lessons()->count() + 1,
            'is_published' => true,
        ]);

        return response()->json($lesson, 201);
    }

    public function update(Request $request, $id)
    {
        $lesson = Lesson::findOrFail($id);

        abort_if(
            $lesson->module->course->instructor_id !== Auth::id(),
            403
        );

        $lesson->update([
            'title' => $request->title,
            'content' => $request->content,
            'is_published' => $request->is_published ?? $lesson->is_published,
        ]);

        return $lesson;
    }

    public function destroy($id)
    {
        $lesson = Lesson::findOrFail($id);

        abort_if(
            $lesson->module->course->instructor_id !== Auth::id(),
            403
        );

        $lesson->delete();

        return response()->noContent();
    }

   public function reorder(Request $request)
{
    foreach ($request->lessons as $index => $id) {
        Lesson::where('id', $id)->update([
            'sort_order' => $index + 1
        ]);
    }

    return response()->json(['message' => 'Lessons reordered']);
}



}
