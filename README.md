# Gym Class Scheduling and Membership Management System

## Project Overview

The Gym Class Scheduling and Membership Management System is a web-based application designed to efficiently manage gym operations. The system includes role-based access for Admins, Trainers, and Trainees to handle tasks like class scheduling, trainer management, and class bookings.

Admins can manage trainers and class schedules, trainers can view their assigned classes, and trainees can book available classes, all while adhering to business rules such as booking limits and schedule caps.

---

## Technology Stack

### Backend
- **Programming Language**: JavaScript
- **Web Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)

---

## Features

### Authentication
- Secure login and registration using JWT.
- Role-based permissions for Admins, Trainers, and Trainees.

### Admin Features
- **Trainer Management**: Add, update, delete, and view trainers.
- **Class Scheduling**: Schedule classes (max 5/day, 2-hour duration) and assign trainers.
- Enforce class capacity of 10 trainees per schedule.

### Trainer Features
- View assigned classes with details (date, time, attendees).

### Trainee Features
- Create and manage profiles.
- Book classes, subject to availability.

---

## API Endpoints

### Authentication
- **POST** `/api/auth/login`: Authenticate user.
- **POST** `/api/auth/register`: Register new trainees.

### Trainer Management (Admin only)
- **GET** `/api/trainers`: Fetch all trainers.
- **POST** `/api/trainers`: Add a new trainer.
- **PUT** `/api/trainers/:id`: Update a trainer.
- **DELETE** `/api/trainers/:id`: Remove a trainer.

### Class Scheduling (Admin only)
- **GET** `/api/classes`: Fetch all schedules.
- **POST** `/api/classes`: Add a new class schedule.
- **GET** `/api/classes/:trainerId`: View schedules for a trainer.

### Booking (Trainees only)
- **POST** `/api/classes/:classId/book`: Book a class.

---

## Database Schema

### User Collection
```json
{
  "id": "string",
  "email": "string",
  "password": "string",
  "role": "enum('admin', 'trainer', 'trainee')",
  "name": "string"
}
### Class Collection
json
Copy code
{
  "id": "string",
  "trainerId": "string",
  "date": "date",
  "startTime": "time",
  "endTime": "time",
  "trainees": ["string"]
}
### Trainer Collection
json
Copy code
{
  "id": "string",
  "name": "string",
  "email": "string"
}
Trainee Collection
json
Copy code
{
  "id": "string",
  "name": "string",
  "email": "string",
  "classesBooked": ["string"]
}
### Business Rules
Maximum of 5 class schedules per day.
Each class schedule lasts for 2 hours.
Maximum of 10 trainees per schedule.
Role-based restrictions enforced using JWT.
Error Handling
Sample Responses
Validation Error
json
Copy code
{
  "success": false,
  "message": "Validation error occurred.",
  "errorDetails": {
    "field": "email",
    "message": "Invalid email format."
  }
}
### Unauthorized Access
json
Copy code
{
  "success": false,
  "message": "Unauthorized access.",
  "errorDetails": "You must be an admin to perform this action."
}
### Booking Limit Exceeded
json
Copy code
{
  "success": false,
  "message": "Class schedule is full. Maximum 10 trainees allowed per schedule."
}
