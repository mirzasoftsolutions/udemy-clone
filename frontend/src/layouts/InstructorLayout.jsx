import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const InstructorLayout = () => {
  const { logout } = useAuth();
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 p-6 min-h-screen">
          <h2 className="text-xl font-bold mb-6 text-indigo-400">
            Instructor Panel
          </h2>

          <nav className="space-y-3">
            <NavLink
              to="/instructor/dashboard"
              className="block p-2 rounded hover:bg-slate-800"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/instructor/courses"
              className="block p-2 rounded hover:bg-slate-800"
            >
              My Courses
            </NavLink>
            <NavLink
              to="/instructor/courses/create"
              className="block p-2 rounded hover:bg-slate-800"
            >
              Create Course
            </NavLink>

            <button
              className="block w-full text-left p-2 rounded hover:bg-indigo-100"
              onClick={logout}
            >
              Logout
            </button>

          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-8 bg-slate-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default InstructorLayout;
