import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6">
      <div className="max-w-md text-center space-y-6">
        
        {/* Big 404 */}
        <h1 className="text-8xl font-extrabold text-indigo-500">404</h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold">
          Page not found
        </h2>

        <p className="text-white/60">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild variant="secondary">
            <Link to="/">
              Go Home
            </Link>
          </Button>

          <Button asChild>
            <Link to="/courses">
              Browse Courses
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
