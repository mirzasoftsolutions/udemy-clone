import { useEffect, useState } from "react";
import api from "../../services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/courses")
      .then(res => {
        setCourses(res.data.data);
        // console.log(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center text-lg text-white/70">
        Loading courses...
      </div>
    );
  }

  return (
    <div >
      {/* Page Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3 text-white">
          Browse <span className="text-indigo-400">Courses</span>
        </h1>
        <p className="text-white/70">
          Learn skills that actually matter
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid p-5 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {courses.map(course => (
          <Card
            key={course.id}
            className="border-indigo/10 text-green-900 hover:scale-[1.05] hover:border-b-4 hover:border-indigo-400 transition"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold">
                  {course.title}
                </h2>
                <Badge variant="secondary">
                  {course.level}
                </Badge>
              </div>

              <p className="text-green-600 text-sm">
                Master {course.title} with real-world projects.
              </p>

              <div className="flex items-center justify-between pt-4">
                <span className="text-lg font-bold text-indigo-400">
                  ₹{course.price}
                </span>
                

                <Link to={`/courses/${course.slug}`}>
                  <Button size="sm">View Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;
