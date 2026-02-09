

# VideoVerse  (Learning Management System (LMS))


A full-stack Learning Management System built with Laravel 12 (Backend API) and React 19 (Frontend).
This project supports role-based access for Admin, Instructor, and Student, inspired by platforms like Udemy.

🚀 Tech Stack : 
--------------------------
Backend (API)
    Laravel 12
        Laravel Sanctum (Authentication)
        MySQL
        RESTful APIs
        Role & Permission based access
        MVC + Service based architecture

Frontend
    React 19
        React Router v6
        Axios
        Tailwind CSS
        shadcn/ui components
        Vite

📂 Project Structure
learning-management-system/
│
├── backend/        # Laravel 12 API
│   ├── app/
│   ├── routes/
│   ├── database/
│   └── composer.json
│
├── frontend/       # React 19 App
│   ├── src/
│   ├── public/
│   └── package.json
│
├── README.md
└── .gitignore













👥 User Roles & Features
👨‍🎓 Student
    Register & Login
    Browse courses
    Enroll in courses
    View enrolled courses
    Access modules & lessons

👨‍🏫 Instructor
    Create & manage courses
    Add modules & lessons
    Publish / Draft courses
    View enrolled students











🔐 Authentication

Laravel Sanctum (cookie + token based)
    CSRF protected
    Role-based route protection
    Secure API access




⚙️ Installation & Setup : 

1️⃣ Clone Repository : 

git clone https://github.com/mirzasoftsolutions/videoverse.git
cd videoverse

2️⃣ Backend Setup (Laravel)
        cd backend
        composer install
        cp .env.example .env
        php artisan key:generate

           -> Update .env:
                DB_DATABASE=udemy_clone
                DB_USERNAME=root
                DB_PASSWORD=

        Run migrations & seeders:

        php artisan migrate --seed
        php artisan serve

Backend runs on:

http://127.0.0.1:8000





3️⃣ Frontend Setup (React)
    cd frontend
    npm install
    npm run dev

Frontend runs on:

http://localhost:5173



🔗 API Communication

Axios with withCredentials
Sanctum CSRF handling
Protected routes using React ProtectedRoute





🧠 Project Goal

This project is built to:

Practice real-world full-stack architecture
Understand role-based systems
Learn Laravel + React integration
Build a scalable LMS MVP







📜 License

This project is open-source and available under the MIT License.

👨‍💻 Author

Mirza Musavvir
Full Stack Developer (Laravel + React)
