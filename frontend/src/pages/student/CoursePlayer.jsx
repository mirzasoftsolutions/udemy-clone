import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { toEmbedUrl } from "@/utils/video";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const CoursePlayer = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    api.get(`/student/courses/${courseId}`).then((res) => {
        console.log(res.data);
      setCourse(res.data);

      // auto-select first lesson
      const firstLesson =
        res.data.modules?.[0]?.lessons?.[0] || null;
console.log("First lesson:", firstLesson);
      setActiveLesson(firstLesson);
    });
  }, [courseId]);

  if (!course) return <p>Loading course...</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

      {/* LEFT: Lesson List */}
      <Card className="lg:col-span-1">
        <CardContent className="p-0">
          <ScrollArea className="h-[80vh] p-4 space-y-4">
            {course.modules.map((module) => (
              <div key={module.id}>
                <h3 className="font-semibold mb-2 ">
                  {module.title}
                </h3>

                <div className="space-y-1 ">
                  {module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full text-left p-2 rounded text-sm transition cursor-pointer
                        ${
                          activeLesson?.id === lesson.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                    >
                      {lesson.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* RIGHT: Video Player */}
      <Card className="lg:col-span-3">
        <CardContent className="space-y-4">
          {activeLesson ? (
            <>
              <div className="aspect-video rounded overflow-hidden bg-black">
                <iframe
                    src={toEmbedUrl(activeLesson.content)}
                    className="w-full h-full"
                    allowFullScreen
                    />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  {activeLesson.title}
                </h2>
                <Badge variant="secondary">Lesson</Badge>
              </div>
            </>
          ) : (
            <p>No lesson selected</p>
          )}
        </CardContent>
      </Card>

    </div>
  );
};

export default CoursePlayer;
