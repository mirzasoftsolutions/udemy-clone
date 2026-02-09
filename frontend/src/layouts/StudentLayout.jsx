import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const StudentLayout = () => {
  const { logout } = useAuth();
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen p-5">
          <h2 className="text-xl font-bold mb-6">Student Panel</h2>

          <nav className="space-y-3">
            <NavLink
              to="/student/dashboard"
              className="block p-2 rounded hover:bg-indigo-100"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/courses"
              className="block p-2 rounded hover:bg-indigo-100"
            >
              Browse Courses
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
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
