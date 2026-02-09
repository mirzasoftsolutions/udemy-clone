import { useEffect, useState } from "react";
import api from "../../services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/student/courses")
      .then((res) => {
        // console.log(res.data);
        setCourses(res.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-white/70">Loading your courses...</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Courses</h1>

      {courses.length === 0 && (
        <p className="text-white/60">
          You haven’t enrolled in any courses yet.
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/student/courses/${course.id}`}
          >
            <Card className="bg-slate-900 border-white/10  hover:scale-[1.05] hover:border-b-4 hover:border-indigo-400 transition ">
              <CardContent className="p-5 space-y-3">
                <Badge variant="secondary">{course.level}</Badge>

                <h3 className="font-semibold text-lg leading-tight text-shadow-fuchsia-50 text-white">
                  {course.title}
                </h3>

                <p className="text-sm text-white/60 text-end">
                  Continue learning →
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;



