<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $instructor = User::where('role', 'instructor')->first();

        if (!$instructor) {
            return;
        }

        $courses = [
            [
                'title' => 'Laravel for Beginners',
                'description' => 'Learn Laravel from scratch with real examples.',
                'price' => 1999,
                'level' => 'beginner',
            ],
            [
                'title' => 'Advanced Laravel APIs',
                'description' => 'Build secure and scalable REST APIs using Laravel.',
                'price' => 2999,
                'level' => 'advanced',
            ],
            [
                'title' => 'React + Laravel Full Stack',
                'description' => 'Build a complete Udemy-style platform.',
                'price' => 3999,
                'level' => 'intermediate',
            ],
        ];

        foreach ($courses as $course) {
            Course::create([
                'title' => $course['title'],
                'slug' => Str::slug($course['title']),
                'description' => $course['description'],
                'price' => $course['price'],
                'level' => $course['level'],
                'instructor_id' => $instructor->id,
                'is_published' => true,
            ]);
        }
    }
}
