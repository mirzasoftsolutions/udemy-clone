import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createLesson, deleteModule } from "@/services/instructorCourses";

const ModuleCard = ({ module, reload }) => {
  const [open, setOpen] = useState(false);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");

  const addLesson = async () => {
    if (!lessonTitle) return;
    await createLesson(module.id, { title: lessonTitle, content: lessonContent });
    setLessonTitle("");
    setLessonContent("");
    reload();
  };

  const removeModule = async () => {
    if (!confirm("Delete this module?")) return;
    await deleteModule(module.id);
    reload();
  };

  return (
    <div className="border rounded-lg ">
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h3 className="font-semibold text-white-800">{module.title}</h3>
        <Button
          size="sm"
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation();
            removeModule();
          }}
        >
          Delete
        </Button>
      </div>

      {/* Body */}
      {open && (
        <div className="p-4 space-y-3 border-t">
          {/* Lessons */}
          {module.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex justify-between text-dark text-sm p-2 rounded "
            >
              {lesson.title}
            </div>
          ))}

          {/* Add Lesson */}
          <div className="flex gap-2">
            <Input className="flex-1 text-dark"
              placeholder="Lesson title"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
            />
            <Input className="flex-1 text-dark"
              placeholder="Lesson Content (YouTube/Vimeo URL or iframe src)"
              value={lessonContent}
              onChange={(e) => setLessonContent(e.target.value)}
            />
            <Button className="bg-slate-700 hover:bg-slate-800 text-white cursor-pointer" size="sm" onClick={addLesson}>
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleCard;
