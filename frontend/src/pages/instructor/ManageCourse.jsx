import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getModules, createModule,courseName } from "@/services/instructorCourses";
import ModuleCard from "./ModuleCard";

const ManageCourse = () => {
  const { courseId } = useParams();
  const [modules, setModules] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [title, setTitle] = useState("");

  const loadModules = async () => {
    const res = await getModules(courseId);
    setModules(res.data);
  };

  const handleCreateModule = async () => {
    if (!title) return;
    await createModule(courseId, { title });
    setTitle("");
    loadModules();
  };

  useEffect(() => {
    courseName(courseId).then(setCourseTitle);
    loadModules();
  }, []);

  return (
    <div>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Course Module Of : <u>{courseTitle}</u></h1>

        {/* Create Module */}
        <div className="flex gap-3 max-w-xl">
          <Input
            placeholder="New module title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button onClick={handleCreateModule}>Add Module</Button>
        </div>

        {/* Modules */}
        <div className="space-y-4">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              reload={loadModules}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCourse;
