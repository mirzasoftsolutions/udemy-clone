import { useEffect, useState } from "react";
import api from "../../services/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

const InstructorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = () => {
    api
      .get("/instructor/courses")
      .then((res) => setCourses(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (id) => {
    if (!confirm("Delete this course?")) return;
    await api.delete(`/instructor/courses/${id}`);
    fetchCourses();
  };

  if (loading) {
    return <p className="text-white/70">Loading courses...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Courses</h1>

        <Link to="/instructor/courses/create">
          <Button variant="secondary" className="cursor-pointer"> <i className="bi bi-plus-circle"></i> Create Course</Button>
        </Link>
      </div>

      {courses.length === 0 ? (
        <p className="text-white/60">
          You haven’t created any courses yet.
        </p>
      ) : (
        <div className="rounded-xl border border-white/10 bg-slate-900">
          <Table>
            <TableHeader className="bg-slate-400 text-white">
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">
                    {course.title}
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary">
                      {course.level}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    ₹{course.price}
                  </TableCell>

                  <TableCell>
                    {course.is_published ? (
                      <Badge className="bg-green-600">
                        Published
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        Draft
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    <Link
                      to={`/instructor/courses/${course.id}/edit`}
                    >
                      <Button
                        variant="secondary" className="bg-yellow-600 hover:bg-yellow-700 cursor-pointer"
                        size="sm"
                      >
                        Edit
                      </Button>
                    </Link>

                    <Button
                      size="sm"
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() =>
                        deleteCourse(course.id)
                      }
                    >
                      Delete
                    </Button>

                    <Link
                      to={`/instructor/courses/${course.id}/manage`}
                    >
                      <Button
                        variant="secondary" className="bg-slate-700 hover:bg-slate-800 cursor-pointer text-white"
                        size="sm"
                      >
                        Manage
                      </Button>
                    </Link>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default InstructorCourses;
