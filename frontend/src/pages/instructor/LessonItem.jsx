import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/services/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const LessonItem = () => {
  const { courseId, lessonId } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [lesson, setLesson] = useState({
    title: "",
    description: "",
    video_url: "",
    is_published: false,
  });

  /* Fetch lesson */
  useEffect(() => {
    api
      .get(`/instructor/courses/${courseId}/lessons/${lessonId}`)
      .then((res) => {
        setLesson(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [courseId, lessonId]);

  const handleChange = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(
        `/instructor/courses/${courseId}/lessons/${lessonId}`,
        lesson
      );
      alert("Lesson updated");
    } catch (err) {
      alert("Failed to save lesson" + (err.response?.data?.message || ""));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading lesson...</p>;

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold">Edit Lesson</h1>

      {/* Lesson Form */}
      <Card>
        <CardHeader>
          <CardTitle>Lesson Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label>Lesson Title</Label>
            <Input
              name="title"
              value={lesson.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              rows={4}
              value={lesson.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Video URL (YouTube / Vimeo / iframe src)</Label>
            <Input
              name="video_url"
              value={lesson.video_url}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-3">
            <Switch
              checked={lesson.is_published}
              onCheckedChange={(val) =>
                setLesson({ ...lesson, is_published: val })
              }
            />
            <Label>Published</Label>
          </div>

          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Lesson"}
          </Button>
        </CardContent>
      </Card>

      {/* Video Preview */}
      {lesson.video_url && (
        <Card>
          <CardHeader>
            <CardTitle>Video Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded overflow-hidden">
              <iframe
                src={lesson.video_url}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LessonItem;
