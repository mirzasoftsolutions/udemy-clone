import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "student",
  });

  const submit = async (e) => {
    e.preventDefault();
    await register(form);
    navigate("/dashboard");
  };

  return (
    <AuthLayout title="Create an account" >
      <Card>
        <CardContent className="space-y-4 pt-6 ">
          <form onSubmit={submit} className="space-y-4 ">
            <div>
              <Label>Name</Label>
              <Input onChange={e => setForm({...form, name: e.target.value})} />
            </div>

            <div>
              <Label>Email</Label>
              <Input onChange={e => setForm({...form, email: e.target.value})} />
            </div>

            <div>
              <Label>Password</Label>
              <Input type="password" onChange={e => setForm({...form, password: e.target.value})} />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input type="password" onChange={e => setForm({...form, password_confirmation: e.target.value})} />
            </div>

            <div>
              <Label>Role</Label>
              <select
                className="w-full border rounded-md px-3 py-2"
                onChange={e => setForm({...form, role: e.target.value})}
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>

            <Button className="w-full">Register</Button>
          </form>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 underline">
                Login
            </a>
            </p>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
