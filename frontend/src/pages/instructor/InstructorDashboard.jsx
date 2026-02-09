import { useEffect, useState } from "react";
import api from "../../services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const InstructorDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/instructor/dashboard")
      .then((res) => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-white/70">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white ">
          Instructor Dashboard
        </h1>
        <p className="text-white/60">
          Manage your courses and track student engagement.
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className=" bg-slate-900 border-white/10 hover:border-indigo-400 hover:scale-[1.05] hover:border-b-4 transition">
          <CardContent className="p-6">
            <p className="text-sm text-white/60">Total Courses</p>
            <p className="text-3xl font-bold text-white ">
              {stats.total_courses}
            </p>
          </CardContent>
        </Card>

        <Card className=" bg-slate-900 border-white/10 hover:border-indigo-400 hover:scale-[1.05] hover:border-b-4 transition">
          <CardContent className="p-6">
            <p className="text-sm text-white/60">
              Published
            </p>
            <p className="text-3xl font-bold text-white ">
              {stats.published_courses}
            </p>
          </CardContent>
        </Card>

        <Card className=" bg-slate-900 border-white/10 hover:border-indigo-400 hover:scale-[1.05] hover:border-b-4 transition">
          <CardContent className="p-6">
            <p className="text-sm text-white/60">Drafts</p>
            <p className="text-3xl font-bold text-white ">
              {stats.draft_courses}
            </p>
          </CardContent>
        </Card>

        <Card className=" bg-slate-900 border-white/10 hover:border-indigo-400 hover:scale-[1.05] hover:border-b-4 transition">
          <CardContent className="p-6">
            <p className="text-sm text-white/60">
              Total Students
            </p>
            <p className="text-3xl font-bold text-white ">
              {stats.total_students}
            </p>
          </CardContent>
        </Card>
      </div>

      
    </div>
  );
};

export default InstructorDashboard;
