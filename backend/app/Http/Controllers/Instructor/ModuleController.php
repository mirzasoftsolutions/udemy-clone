<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ModuleController extends Controller
{
    public function index($courseId)
    {
        $course = Course::where('id', $courseId)
            ->where('instructor_id', Auth::id())
            ->firstOrFail();

        return $course->modules()->with('lessons')->get();
    }

    public function store(Request $request, $courseId)
    {
        $course = Course::where('id', $courseId)
            ->where('instructor_id', Auth::id())
            ->firstOrFail();

        $module = $course->modules()->create([
            'title' => $request->title,
            'sort_order' => $course->modules()->count() + 1,
        ]);

        return response()->json($module, 201);
    }

    public function update(Request $request, $id)
    {
        $module = Module::findOrFail($id);

        abort_if(
            $module->course->instructor_id !== Auth::id(),
            403
        );

        $module->update([
            'title' => $request->title,
        ]);

        return $module;
    }

    public function destroy($id)
    {
        $module = Module::findOrFail($id);

        abort_if(
            $module->course->instructor_id !== Auth::id(),
            403
        );

        $module->delete();

        return response()->noContent();
    }

    public function reorder(Request $request)
{
    foreach ($request->modules as $index => $id) {
        Module::where('id', $id)->update([
            'sort_order' => $index + 1
        ]);
    }

    return response()->json(['message' => 'Modules reordered']);
}

}
