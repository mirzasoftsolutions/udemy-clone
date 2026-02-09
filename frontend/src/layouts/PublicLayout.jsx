import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";

const PublicLayout = () => {

  const {user} = useAuth();
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navbar */}
      <header className="border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link to="/" className="text-xl font-bold">
            Udemy<span className="text-indigo-400">Clone</span>
          </Link>

          <div className="space-x-3">
            <Link to="/courses">
              <Button variant="secondary">Browse Courses</Button>
            </Link>
            
            {user && user.role ==="student" ? (
              <Link to="/student/dashboard">
                <Button variant="secondary">Dashboard</Button>
              </Link>
            ) : user && user.role ==="instructor" ? (
              <Link to="/instructor/dashboard">
                <Button variant="secondary">Dashboard</Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="secondary">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="container mx-auto py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 text-center py-6 text-sm text-white/60">
        © {new Date().getFullYear()} Udemy Clone. All rights reserved.
      </footer>
    </div>
  );
};

export default PublicLayout;
