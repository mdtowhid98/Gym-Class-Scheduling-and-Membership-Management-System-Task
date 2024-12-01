# Backend Overview for Gym Class Scheduling and Membership Management System
This project will implement a Gym Class Scheduling and Membership Management System with a backend using TypeScript, Express.js, MongoDB, and JWT for authentication. The backend will follow a modular structure (preferably using MVC architecture), making it scalable and maintainable.

## 1. Project Overview:
The backend system is responsible for handling all the business logic for gym management, including managing trainers, trainees, class schedules, and bookings. This system will enforce several business rules such as limiting the number of classes per day, limiting the number of trainees per class, and ensuring authentication via JWT.

## 2. Technology Stack:
Programming Language: TypeScript
Web Framework: Express.js
Database: MongoDB (NoSQL database)
Authentication: JWT (JSON Web Tokens) for user authentication
ORM: Mongoose (ODM for MongoDB)
Error Handling: Custom error handling middleware

## 3. Roles & Permissions:
### Admin:
Can manage trainers (add, update, delete).
Can schedule classes, assign trainers to classes.
Cannot manage trainee profiles.
Must adhere to the class and schedule limitations.

### Trainer:
Can view assigned classes.
Cannot manage class schedules or trainees.

### Trainee:
Can create and manage their own profile.
Can book classes (up to 10 trainees per class).

## 4. Database Schema:
Trainee Model:
ts
Copy code
import { Schema, model } from "mongoose";

const traineeSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookings: [{ type: Schema.Types.ObjectId, ref: "ClassSchedule" }],
});

export const Trainee = model("Trainee", traineeSchema);
Trainer Model:
ts
Copy code
import { Schema, model } from "mongoose";

const trainerSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Trainer = model("Trainer", trainerSchema);
ClassSchedule Model:
ts
Copy code
import { Schema, model } from "mongoose";

const classScheduleSchema = new Schema({
  className: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, default: 2 }, // Duration in hours
  trainer: { type: Schema.Types.ObjectId, ref: "Trainer", required: true },
  trainees: [{ type: Schema.Types.ObjectId, ref: "Trainee" }],
});

export const ClassSchedule = model("ClassSchedule", classScheduleSchema);
User Model (Admin, Trainer, Trainee)
ts
Copy code
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  role: { type: String, enum: ["admin", "trainer", "trainee"], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = model("User", userSchema);

## 5. Relational Diagram:
The relational diagram for the database schema could look like this:

markdown
Copy code
┌────────────┐        ┌────────────┐        ┌────────────────────┐
│   Trainer  │ 1     *│ ClassSchedule│ *   1│    Trainee         │
└────────────┘        └────────────┘        └────────────────────┘
      │                      │                   │
      └──────────────────────┴───────────────────┘
Trainer: Each trainer can have multiple class schedules, and each class schedule will be linked to one trainer.
ClassSchedule: Each class schedule can accommodate multiple trainees, but a trainee can only book a class if there is availability.
Trainee: Each trainee can have multiple class bookings, and each booking is tied to a specific class schedule.

## 6. API Endpoints:
### Authentication:
POST /api/auth/login: Login user (returns JWT token)

Request Body: { email: string, password: string }
Response: { success: boolean, message: string, token: string }
POST /api/auth/register: Register a new user (Trainee only)

Request Body: { fullName: string, email: string, password: string }
Response: { success: boolean, message: string }

### Admin Routes:
POST /api/admin/createTrainer: Create a new trainer

Request Body: { fullName: string, email: string, password: string }
Response: { success: boolean, message: string, data: Trainer }
GET /api/admin/trainers: List all trainers

Response: { success: boolean, data: Trainer[] }
POST /api/admin/scheduleClass: Create a class schedule

Request Body: { className: string, date: string, trainerId: string }
Response: { success: boolean, message: string, data: ClassSchedule }

### Trainer Routes:
GET /api/trainer/schedules: Get trainer's assigned class schedules
Response: { success: boolean, data: ClassSchedule[] }
Trainee Routes:
GET /api/trainee/bookings: Get all class bookings of the trainee

Response: { success: boolean, data: ClassSchedule[] }
POST /api/trainee/bookClass: Book a class for the trainee

Request Body: { classScheduleId: string }
Response: { success: boolean, message: string }

### 7. Error Handling:
To ensure the system operates smoothly, proper error handling must be in place:

Unauthorized Access:

Response: { success: false, message: "Unauthorized access", errorDetails: "You must be an admin to perform this action." }
Validation Errors:

Response: { success: false, message: "Validation error occurred.", errorDetails: { field: string, message: string } }
Booking Limit Exceeded:

Response: { success: false, message: "Class schedule is full. Maximum 10 trainees allowed per schedule." }
Class Schedule Limit Exceeded:

Response: { success: false, message: "You cannot schedule more than 5 classes per day." }

### 8. Authentication and Authorization:
JWT Token: Every request that needs to access protected routes (e.g., scheduling classes, managing trainers) must include a valid JWT token in the Authorization header.

Role-based Access Control (RBAC): Based on the role of the user (admin, trainer, or trainee), access to various routes will be restricted:

Admin: Full access to all routes.
Trainer: Can view assigned classes, but cannot schedule or manage trainees.
Trainee: Can only book and view their own classes.



### 9. Testing:
Admin Role:

Test the creation of trainers and class schedules.
Ensure the class schedule limits and booking limits are enforced.
Trainer Role:

Test that trainers can only view their own assigned classes.
Trainee Role:

Test the ability to book a class and check for booking limits.
