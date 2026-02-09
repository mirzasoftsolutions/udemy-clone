import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

const CourseDetails = () => {
  const { slug } = useParams();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

 useEffect(() => {
    api.get(`/courses/${slug}`).then((res) => {
      // console.log(res.data);
      setCourse(res.data);
      setIsEnrolled(res.data.is_enrolled); 
      setLoading(false);
    });
  }, [slug]);

  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      await api.post(`/courses/${course.id}/enroll`);
      setIsEnrolled(true);
    } catch (err) {
      console.error(err);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <p className="text-white/70">Loading...</p>;
  if (!course) return <p className="text-red-400">Course not found</p>;

  return (
    <div className="grid lg:grid-cols-3 gap-10">
      {/* LEFT SIDE */}
      <div className="lg:col-span-2 space-y-6">
        <Badge variant="secondary" className="capitalize">
          {course.level}
        </Badge>

        <h1 className="text-4xl font-bold leading-tight">
          {course.title}
        </h1>

        <p className="text-white/70 text-lg">
          {course.description || "No description provided yet."}
        </p>

        <Separator className="bg-white/10" />

        <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/70">
          <span> 1. Beginner friendly</span>
          <span> 2. Learn at your own pace</span>
          <span> 3. Practical examples</span>
          <span> 4. Lifetime access</span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <Card className="bg-slate-900 border-white/10">
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-1">
            <p className="text-3xl text-white font-semibold">₹{course.price}</p>
            <p className="text-sm text-white/60">One-time enrollment</p>
          </div>

          {!user && (
            <Link to="/login">
              <Button className="w-full cursor-pointer" variant="secondary">Login to Enroll</Button>
            </Link>
          )}

          {user && isEnrolled && (
            <Button className="w-full cursor-pointer" variant="secondary" disabled>
              Enrolled
            </Button>
          )}

          {user && !isEnrolled && (
            <Button
              className="w-full cursor-pointer" variant="secondary"
              onClick={handleEnroll}
              disabled={enrolling}
            >
              {enrolling ? "Enrolling..." : "Enroll Now"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetails;
