import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center ">
      <h1 className="text-4xl font-bold mb-4">
        Learn Skills. Build Your Future.
      </h1>

      <p className="text-white max-w-xl mb-6 underline decoration-green-150/50 decoration-1">
        High-quality courses from real instructors. Learn at your own pace.
      </p>

      <div className="flex gap-4">
        <Link to="/courses">
          <Button variant="outline" className="bg-transparent  border-white/20 hover:bg-white/10">Browse Courses</Button>
        </Link>

        <Link to="/register">
          <Button variant="outline" className="bg-transparent border-white/20 hover:bg-white/10">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
