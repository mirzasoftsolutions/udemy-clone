import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const levels = ["beginner", "intermediate", "advanced"];

const CourseForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [form, setForm] = useState({
        title: "",
        slug: "",
        price: "",
        level: "beginner",
        description: "",
        is_published: "0",
    });

    const [loading, setLoading] = useState(false);
    //   const [slug, setSlug] = useState("");  
    //   const [isSlugEdited, setIsSlugEdited] = useState(false);


    const handleSlugChange = (e) => {
        // setIsSlugEdited(true);
        const title = e.target.value;
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
        setForm((prev) => ({
            ...prev,
            slug: slug,
        }));


    };


    useEffect(() => {
        if (!isEdit) return;

        api.get(`/instructor/courses/${id}`).then((res) => {
            // console.log(res.data);
            setForm({
                title: res.data.title,
                slug: res.data.slug,
                price: res.data.price,
                level: res.data.level,
                description: res.data.description ?? "",
                is_published: res.data.is_published ? "1" : "0",
            });
        });
    }, [id, isEdit]);

    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value);
        setForm({
            ...form,
            [e.target.name]: e.target.value,
            is_published: Number(e.target.value) === 1 ? 1 : 0,
        });
           
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEdit) {
                console.log("Updating course with data:", form);
                await api.put(`/instructor/courses/${id}`, form);
            } else {
                await api.post("/instructor/courses", form);
            }

            navigate("/instructor/courses");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="bg-slate-200 border-white/10 max-w-2xl">
            <CardContent className="p-6 space-y-6">
                <h1 className="text-2xl font-bold">
                    {isEdit ? "Edit Course" : "Create Course"}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <Label>Title</Label>
                        <Input
                            name="title" className="border-white"
                            value={form.title}
                            onChange={(e) => {
                                handleChange(e);
                                handleSlugChange(e);
                            }}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Slug</Label>
                        <Input
                            name="slug" className="border-white"
                            value={form.slug}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Description</Label>
                        <Textarea
                            name="description"
                            value={form.description}
                            className="border-white"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <Label>Price</Label>
                            <Input
                                name="price"
                                type="number"
                                min="0"
                                value={form.price}
                                onChange={handleChange}
                                required
                                className="border-white"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Level</Label>
                            <select
                                name="level"
                                value={form.level}
                                onChange={handleChange}
                                className="w-full rounded-md bg-background border border-white p-2"
                            >
                                {levels.map((lvl) => (
                                    <option key={lvl} value={lvl}>
                                        {lvl}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <Label>Is Published?</Label>
                            <select
                                name="is_published"
                                value={form.is_published}
                                onChange={handleChange}
                                className="w-full rounded-md bg-background border border-white p-2"
                            >
                                <option value="0" selected={!form.is_published ? "selected" : ""}>Draft</option>
                                <option value="1" selected={form.is_published ? "selected" : ""}>Published</option>
                            </select>

                        </div>

                    </div>

                    <Button disabled={loading} className="w-full">
                        {loading
                            ? "Saving..."
                            : isEdit
                                ? "Update Course"
                                : "Create Course"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default CourseForm;
