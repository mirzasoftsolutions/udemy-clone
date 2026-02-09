import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";



import StudentDashboard from "./pages/student/StudentDashboard";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";

import Landing from "./pages/public/Landing";
import Courses from "./pages/public/Courses";
import CourseDetails from "./pages/public/CourseDetails";
import PublicLayout from '@/layouts/PublicLayout';
import StudentLayout from '@/layouts/StudentLayout';
import InstructorLayout from '@/layouts/InstructorLayout';
import NotFound from "./pages/NotFound";
import InstructorCourses from "./pages/instructor/InstructorCourses";
import CourseForm from "./pages/instructor/CourseForm";
import ManageCourse from "./pages/instructor/ManageCourse";
import CoursePlayer from "./pages/student/CoursePlayer";
// import LessonItem from "./pages/instructor/LessonItem";




export default function App() {




  return (
    <Routes>
      {/* Public */}

      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetails />} />
      </Route>


      

      {/* Role based */}

      <Route element={<ProtectedRoute />}>
        <Route element={<StudentLayout />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/courses/:courseId" element={<CoursePlayer />} />
        </Route>
      </Route>





      <Route element={<ProtectedRoute />}>
        <Route element={<InstructorLayout />}>
          <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
          <Route path="/instructor/courses" element={<InstructorCourses />} />
          <Route path="/instructor/courses/create" element={<CourseForm />} /> 
          <Route path="/instructor/courses/:id/edit" element={<CourseForm />} />
          <Route path="/instructor/courses/:courseId/manage" element={<ManageCourse />} />
          
        </Route>
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />









    </Routes>
  );
}
