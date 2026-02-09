import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AuthLayout from "../layouts/AuthLayout";
import { Label } from "@/components/ui/label";

export default function Login() {
    const { login } = useAuth();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const submit = async (e) => {
        e.preventDefault();

        try {
             await login(form);
            //  console.log("Logged in user:", user); 
            if (user.role === "instructor") {
                navigate("/instructor/dashboard");
            } else {
                navigate("/student/dashboard");
            }
            // navigate("/dashboard");
        } catch (err) {
            console.error(err);
            // later: toast / error message
        }
    };

    return (
        

        <AuthLayout title="Login Here" >
            <Card>
                <CardContent className="space-y-4 pt-6 ">
                    <form onSubmit={submit} className="space-y-4 ">


                        <div>
                            <Label>Email</Label>
                            <Input onChange={e => setForm({ ...form, email: e.target.value })} />
                        </div>

                        <div>
                            <Label>Password</Label>
                            <Input type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
                        </div>



                        <Button className="w-full">Login</Button>
                    </form>
                    <p className="text-sm text-center mt-4">
                        Don’t have an account?{" "}
                        <a href="/register" className="text-blue-600 underline">
                            Register
                        </a>
                    </p>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}
